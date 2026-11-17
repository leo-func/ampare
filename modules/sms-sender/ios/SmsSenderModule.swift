import ExpoModulesCore
import MessageUI

// O delegate precisa herdar de NSObject, por isso fica em uma classe separada.
final class SmsComposeDelegate: NSObject, MFMessageComposeViewControllerDelegate {
  private let promise: Promise
  private let onFinish: () -> Void

  init(promise: Promise, onFinish: @escaping () -> Void) {
    self.promise = promise
    self.onFinish = onFinish
  }

  func messageComposeViewController(
    _ controller: MFMessageComposeViewController,
    didFinishWith result: MessageComposeResult
  ) {
    controller.dismiss(animated: true) {
      switch result {
      case .sent: self.promise.resolve("sent")
      case .cancelled: self.promise.resolve("cancelled")
      default: self.promise.resolve("failed")
      }
      self.onFinish()
    }
  }
}

public class SmsSenderModule: Module {
  private var delegate: SmsComposeDelegate?

  public func definition() -> ModuleDefinition {
    Name("SmsSender")

    Function("isAvailable") { () -> Bool in
      return MFMessageComposeViewController.canSendText()
    }

    AsyncFunction("sendSMS") { (phoneNumber: String, message: String, promise: Promise) in
      DispatchQueue.main.async {
        guard MFMessageComposeViewController.canSendText() else {
          promise.reject("E_UNAVAILABLE", "Este dispositivo não pode enviar SMS")
          return
        }
        guard let presenter = self.appContext?.utilities?.currentViewController() else {
          promise.reject("E_NO_VIEW_CONTROLLER", "Nenhuma tela disponível para exibir o compositor")
          return
        }

        let composer = MFMessageComposeViewController()
        composer.recipients = [phoneNumber]
        composer.body = message

        let delegate = SmsComposeDelegate(promise: promise) { [weak self] in
          self?.delegate = nil
        }
        self.delegate = delegate
        composer.messageComposeDelegate = delegate

        presenter.present(composer, animated: true)
      }
    }
  }
}
