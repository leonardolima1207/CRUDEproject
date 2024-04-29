function modalOpen() {
    document.querySelector('h2').innerText = 'Novo Usuário'
    document.getElementById('saveValues').innerText = 'Salvar';
    
    
    document.getElementById('modal').classList.add('active');
    
}

function modalClose() {
    document.getElementById('modal').classList.remove('active');

}

document.getElementById('userRegistration').addEventListener('click',modalOpen);
document.getElementById('modalClose').addEventListener('click',modalClose);


function addUser() {
    let listUser = []
    
    const id = Math.floor(Math.random() * 100);
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const city = document.getElementById('city').value

    const objUser = {
        idUser: id,
        nomeUser: nome, 
        emailUser: email,
        celUser: cel,
        cityUser: city
    }

    if (localStorage.getItem("CadastroUsuario")) {
        listUser = JSON.parse(localStorage.getItem('CadastroUsuario'));
    }

    listUser.push(objUser);

    localStorage.setItem('CadastroUsuario', JSON.stringify(listUser));

    modalClose();

    window.location.reload();

}

document.getElementById('saveValues').addEventListener('click', addUser);


function carregarUsuario() {
    let listUser = [];

    if (localStorage.getItem('CadastroUsuario')) {
        listUser = JSON.parse(localStorage.getItem('CadastroUsuario'));
        
    }
    
    if(listUser.length == 0) {
        let tabela = document.getElementById('corpoTabela');

        tabela.innerHTML = `
            <tr>
                <td colspan= '5'> Nenhum usuário cadastrado </td>
            </tr>
        `
    }else{
        createTableUser(listUser);
    }
}

window.addEventListener('DOMContentLoaded', carregarUsuario);

function createTableUser(dadosUsuario) {

    console.log(dadosUsuario);
    let tabela = document.getElementById('corpoTabela');

    let template = '';

    dadosUsuario.forEach(user => {
        template += `
            <tr>
                <td> ${user.nomeUser} </td>
                <td> ${user.emailUser} </td>
                <td> ${user.celUser} </td>
                <td> ${user.cityUser} </td>
                    <td>
                        <button type="button" class="button green" onclick="updateUser(${user.idUser})"> Editar</button>
                        <button type="button" class="button red" onclick="deleteUser(${user.idUser})">Excluir</button>
                    </td>
            </tr>
        `
        
    });

    tabela.innerHTML = template;
}

function updateUser(id) {
    
    document.getElementById('saveValues').removeEventListener("click", addUser);
    
    modalOpen();
    
    const textTitleUpdate = document.querySelector('h2');
    textTitleUpdate.innerText = 'Atualizar Usuário'

    document.getElementById('saveValues').innerText = "Atualizar";

    const getUserData = JSON.parse(localStorage.getItem('CadastroUsuario'));

    const userData = getUserData.find((user) => user.idUser === id);

    document.getElementById("name").value = userData.nomeUser;
    document.getElementById("email").value = userData.emailUser;
    document.getElementById("cel").value = userData.celUser;
    document.getElementById("city").value = userData.cityUser;

    document.getElementById('saveValues').addEventListener('click', () => updateUserInfo(id));

}

function updateUserInfo(id) {
    alert('id usuario:' + id);
    
    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    const newCel = document.getElementById('cel').value;
    const newCity = document.getElementById('city').value;
    
    const userList = JSON.parse(localStorage.getItem('CadastroUsuario')) || []

    const userIndexFind = userList.findIndex((user) => user.idUser == id);

    if (userIndexFind !== -1) {
        userList[userIndexFind].nomeUser = newName;
        userList[userIndexFind].emailUser= newEmail;
        userList[userIndexFind].celUser = newCel;
        userList[userIndexFind].cityUser = newCity; 

        console.log(userList);
        
        localStorage.setItem('CadastroUsuario', JSON.stringify(userList));
        
    }

    modalClose();
    window.location.reload();
}



function deleteUser(id) {
    const getUserData = JSON.parse(localStorage.getItem('CadastroUsuario'));

    const findUser = getUserData.findIndex((user) => user.idUser == id);

    if (findUser !== -1) {
        getUserData.splice(findUser, 1);

        localStorage.setItem("CadastroUsuario", JSON.stringify(getUserData));

        window.location.reload();
    }
}






















// let usuarios =[];
   

// function cadUsuario() {
    
    
//     const newObject = {
//         nameUser: document.getElementById("name").value,
//         emailUser: document.getElementById("email").value,
//         telUser: document.getElementById("cel").value,
//         cityUser: document.getElementById("city").value
//     }
    
//     if (localStorage.getItem('cadastro')) {
//         usuarios = JSON.parse(localStorage.getItem('cadastro'));
//     }  
    
    
//     localStorage.setItem("usuarios", JSON.stringify(usuarios));
    

    // var newObject = {
//     nome:"Jason",
//     email:"jason@jsn.com",
//     telefone:11112222,
//     cidade:"SP"
// };

// var addObjeto = JSON.stringify(newObject);

// localStorage.setItem('newUser', addObjeto);

// var addObjeto = localStorage.getItem('newUser');

// var saveObjeto = JSON.parse('addObjeto')
