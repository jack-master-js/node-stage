$(document).ready(() => {
    let state = {
        account: 'test',
        password: 'test',
    }

    let $accountInput = $('#accountInput')
    let $passwordInput = $('#passwordInput')
    let $loginBtn = $('#loginBtn')
    let $comModalConfirm = $('#comModalConfirm')
    let $uploadBtn = $('#uploadBtn')

    $accountInput.prop('value', state.account)
    $passwordInput.prop('value', state.password)

    $accountInput.on('change', (e) => {
        state.account = e.target.value
    })

    $passwordInput.on('change', (e) => {
        state.password = e.target.value
    })

    $loginBtn.on('click', (e) => {
        $.post('/user/login', state, (res) => {
            if (!res.success) {
                $('#modalBody').text(res.message)
            } else {
                $('#modalBody').text(res.data.token)
            }
            window.modal.toggle()
        })
    })

    $comModalConfirm.on('click', (e) => {
        window.modal.toggle()
    })

    $uploadBtn.on('click', (e) => {
        var fileList = $('#avatar')[0].files
        console.log(fileList)
        var formData = new FormData()

        for (let i = 0; i < fileList.length; i++) {
            formData.append('multerFile', fileList[i])
        }

        $.ajax({
            url: '/api/upload',
            type: 'post',
            processData: false,
            contentType: false, //使用multer配合ajax时无需配置multipart/form-data，multer将自动配置，手动配置将报错，boundary not found
            data: formData,
            success: function (data) {
                console.log(data)
            },
        })
    })
})
