import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Menu
    menu: {
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#EFEFF4',
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 80
    },
    iconsMenu: {
        width: 42,
        height: 42,
        tintColor: '#00ADEF',
    },

    //Cadastro e login CSS
    header: {
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 100
    },
    titleLogin: {
        color: '#009BD6',
        fontWeight: 'bold',
        fontSize: 17,

    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    main: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 37,
    },
    h1l: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    formLogin: {
        width: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 5,
    },
    inputlogin: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#C7C7CC',
        borderWidth: 0.6,
        marginBottom: 15,
        width: '100%',
        marginTop: 8,
        // backgroundColor: 'white',
    },
    senhaContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    eyeIcon: {
        width: 35,
        height: 35,
        tintColor: '#C7C7CC',
        right: 36,
        bottom: 3,
    },
    submit: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 34,
        borderRadius: 8,
        backgroundColor: '#34ADDA',
        borderWidth: 0.7,
    },
    btnText: {
        fontWeight: 'bold',
        color: '#F8FAFD'
    },
    linksForm: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    linksCadastro: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 10
    },
    linkSenha: {
        color: '#707070',
        fontWeight: '500',
    },
    linkCadastro: {
        color: '#009BD6',
        fontWeight: '500',
    },

    //Tela home CSS
    headerHome: {
        width: '100%',
        backgroundColor: '#00ADEF',
        height: 110,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // bottom: 1,
        // position: 'absolute'
    },
    txtSaldo: {
        color: '#F8FAFD',
        fontSize: 14,
        letterSpacing: 0.6
    },
    saldo: {
        color: '#F8FAFD',
        fontSize: 25
    },
    mainHome: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerDespesas: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#EFEFF4',
        paddingBottom: 4,
    },
    despesas: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: '#EFEFF4',
        borderBottomWidth: 1,
        borderColor: '#00ADEF',
        marginBottom: 10,
        alignItems: 'center',
    },
    iconDespesas: {
        width: 33,
        height: 33,
    },
    statusDespesas: {
        paddingLeft: 15
    },
    dataDespesas: {
        fontSize: 11,
        color: '#707070'
    },
    addSaldo:{
        right: 127
    },
    txtAddSaldo: {
        color: '#00ADEF'
    },
    descDespesas: {
        fontSize: 11,
        color: '#707070'
    },
    dinheiroDespesas: {
        right: 10,
        position: 'absolute',
        alignItems: 'flex-end'
    },
    //Carrosel
    cardCarrosel: {
        borderWidth: 0.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F8FAFD',
        borderRadius: 10,
        borderColor: '#C7C7CC',
        right: 120,
    },
    iconsCarrosel: {
        width: 30,
        height: 30,
        tintColor: '#00BBFF'
    },
    txtCard: {
        color: '#707070',
        fontSize: 12,
        paddingTop: 10,
        paddingBottom: 10,
        letterSpacing: 0.3
    },
    carrosel: {
        width: '100%',
        display: 'flex',
        //  right: 20,
        flexDirection: 'row',
        gap: 20,
    },
    titlesMain: {
        right: 115,
        margin: 3,
        color: '#707070',
        padding: 10
    },

    // Carrosel />

    scroll: {
        height: '70%',
        marginTop: 0,
        alignItems: 'center',
        marginBottom: 100
    },

    //Categoria

    formCategoria: {
        width: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        bottom: 90
    },
    inputCategoria: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'black',
        borderWidth: 0.8,
        marginBottom: 15,
        width: '100%',
        marginTop: 8,
        // backgroundColor: 'white',
    },

    inputCategoriaContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    headerCategoria: {
        width: '100%',
        backgroundColor: '#00ADEF',
        position: 'absolute',
        top: 0,
        height: 106,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    backCategoria: {
        tintColor: '#F8FAFD',
        width: 22,
        height: 22,
        right: 165,
        // marginBottom: 10
    },

    titleCategoria: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 62,
        top: 15,
        paddingBottom: 30,
        letterSpacing: 1,

    },
    titleSaldo: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 92,
        top: 15,
        paddingBottom: 30,
        letterSpacing: 1,

    },

    //Buttons
    btnAddCategorias: {
        position: 'absolute',
        top: 130,
        width: 40,
        height: 40,
        right: 30
    },
    btnCategoria: {
        borderWidth: 1,
        bottom: 50,
        width: '40%',
        borderRadius: 15,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34ADDA',
    },
    btnCategoria2: {
        borderWidth: 1,
        bottom: 50,
        width: '40%',
        borderRadius: 15,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F98E1E',
    },

    //MODAL

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        backgroundColor: '#00ADEF',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-evenly', 
        paddingHorizontal: 13,
        position: 'absolute',
        bottom: 70,
        borderRadius: 30,
        width: '50%',
    },
    closeModal: {
        alignSelf: 'flex-end',
        color: 'blue',
        marginBottom: 17,
    },
    modalOption: {
        width: 27,
        height: 27,
        tintColor: '#F8FAFD',
    },

    //Metas
    headerMetas: {
        width: '100%',
        backgroundColor: '#00ADEF',
        // position: 'absolute',
        top: 0,
        height: 106,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    mainMetas: {
        marginTop: 30
    },

    titleMetas: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 139,
        top: 15,
        letterSpacing: 1,
        paddingBottom: 30,
    },
    cardMetas: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    statusMetas: {
        paddingLeft: 10,
    },
    nomeMeta: {
        fontSize: 14,
    },
    poupancaMeta: {
        fontSize: 12.3,
        color: '#707070',
        marginBottom: 5,
    },
    valorMeta: {
        position: 'absolute',
        top: 23,
        right: -30,
        fontSize: 13
    },
    barraProgressao: {
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        width: 259
    },
    barraProgressoInternaFixa: {
        height: '100%',
        width: '60%',
        backgroundColor: '#00ADEF',
    },
    containerAddMetas: {
        position: 'absolute',
        right: 20,
        bottom: 80
    },


    titleCadMetas: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 78,
        top: 15,
        paddingBottom: 30,
        letterSpacing: 1,
    },

    //Despesas

    headerDespesas: {
        width: '100%',
        backgroundColor: '#00ADEF',
        // position: 'absolute',
        top: 0,
        height: 106,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTotalDespesas: {
        bottom: 30,
        left: 70,
        width: '50%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    headerTitleDespesas: {
        color: '#F8FAFD',
        fontSize: 14,
        letterSpacing: 0.6,
        top: 25,
        right: 102,
        width: 120,
    },
    despesasTitle: {
        color: '#F8FAFD',
        fontSize: 22,
        top: 20,
        right: 100,
        width: 125,
        paddingBottom: 5,
    },
    backDespesas: {
        tintColor: '#F8FAFD',
        width: 22,
        height: 22,
        right: 156,
        top: 15,
    },
    totalDespesas: {
        color: '#F8FAFD',
        fontSize: 14,
        letterSpacing: 0.6,
    },
    priceDespesas: {
        color: '#F8FAFD',
        fontSize: 21,
        bottom: 5,
    },
    containerDespesasCategoria: {
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#EFEFF4',
        paddingBottom: 4,
    },
    containerCardDespesas: {
        width: 350,
        borderRadius: 10,
        backgroundColor: '#EFEFF4',
        paddingBottom: 4,
    },
    scrollDespesas: {
        height: '70%',
        marginTop: 0,
        marginBottom: 100
    },
    titleCadDespesas: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 63,
        top: 15,
        paddingBottom: 30,
        letterSpacing: 1,
    },
    titleDespesa: {
        fontSize: 20,
        color: '#F8FAFD',
        right: 127,
        top: 15,
        paddingBottom: 30,
        letterSpacing: 1,
    },
    despesasOpcoes:{
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});