import { BackgroundShape } from "@/components/BackgroundShape"
import { PhoneIcon, PlusIcon, TrashIcon, UserIcon } from "@/components/FormIcons"
import { getInitials } from "@/utils/getInitials"
import { useContactsViewModel } from "@/viewmodel/contacts.viewmodel"
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

export function ContactsView({
    contact,
    contacts,
    canAdd,
    loading,
    handleChangeName,
    handleChangePhone,
    handleAddContact,
    handleRemoveContact,
}: ReturnType<typeof useContactsViewModel>) {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.background}>
                    <BackgroundShape />
                </View>

                <Text style={styles.title}>Contatos</Text>
                <Text style={styles.subtitle}>Pessoas que serão avisadas por você.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Novo contato</Text>

                <Text style={styles.label}>Nome</Text>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <UserIcon />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do contato"
                        placeholderTextColor="#7D6467"
                        value={contact.name}
                        onChangeText={handleChangeName}
                    />
                </View>

                <Text style={styles.label}>Telefone</Text>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <PhoneIcon />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="(00) 00000-0000"
                        placeholderTextColor="#7D6467"
                        keyboardType="phone-pad"
                        value={contact.phone}
                        onChangeText={handleChangePhone}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.addButton, !canAdd && styles.addButtonDisabled]}
                    activeOpacity={0.85}
                    disabled={!canAdd}
                    onPress={handleAddContact}
                >
                    <PlusIcon />
                    <Text style={styles.addButtonText}>Adicionar contato</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Contatos adicionados</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{contacts.length}</Text>
                </View>
            </View>

            <FlatList
                style={styles.list}
                data={contacts}
                keyExtractor={(item) => item.phone}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    loading ? undefined : (
                        <Text style={styles.empty}>Nenhum contato adicionado ainda.</Text>
                    )
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                        </View>

                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPhone}>{item.phone}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.removeButton}
                            accessibilityLabel={`Remover ${item.name}`}
                            onPress={() => handleRemoveContact(item.phone)}
                        >
                            <TrashIcon />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCEFE8",
    },

    header: {
        height: 190,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logo: { color: "#fff", fontSize: 22, fontWeight: "600" },
    title: { color: "#fff", fontSize: 32, fontWeight: "700", marginTop: 14 },
    subtitle: { color: "#FCE3E0", fontSize: 15, marginTop: 2 },

    list: {
        flex: 1,
        marginBottom: 110,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
        gap: 10,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 18,
        gap: 6,
        marginHorizontal: 20,
        marginTop: 8,
        marginBottom: 20,
        shadowColor: "#6B0A14",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#6B0A14",
        marginBottom: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6B0A14",
        marginTop: 6,
    },
    inputWrapper: {
        justifyContent: "center",
    },
    inputIcon: {
        position: "absolute",
        left: 14,
        zIndex: 1,
    },
    input: {
        height: 48,
        borderWidth: 1.5,
        borderColor: "#E8C9C9",
        borderRadius: 14,
        backgroundColor: "#FFF8F5",
        paddingLeft: 44,
        paddingRight: 14,
        fontSize: 15,
        color: "#3A0A10",
    },
    addButton: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#7A0C18",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 14,
    },
    addButtonDisabled: {
        opacity: 0.45,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginBottom: 10,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#6B0A14",
    },
    badge: {
        backgroundColor: "#F9CDCF",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    badgeText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B0A14",
    },
    empty: {
        textAlign: "center",
        color: "#6E4F52",
        fontSize: 14,
        paddingVertical: 20,
    },

    item: {
        backgroundColor: "#fff",
        borderRadius: 18,
        paddingVertical: 10,
        paddingLeft: 14,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F9CDCF",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#6B0A14",
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#3A0A10",
    },
    itemPhone: {
        fontSize: 13,
        color: "#6E4F52",
        marginTop: 2,
    },
    removeButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
})