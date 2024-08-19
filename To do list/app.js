const input = document.querySelector('input');
const button = document.querySelector('#add')
const tasks = document.querySelector('.tasks')

document.addEventListener('DOMContentLoaded', () => {
    let data = null;
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'))
        if (data) {
            data.forEach(task => {
                taskFunc(task)
            });
            deleteFunc(data)
            completeFunc(data)
        }
    } else {
        localStorage.setItem('data', '[]')
        data = JSON.parse(localStorage.getItem('data'))
    }
    button.addEventListener('click', () => {
        if (!JSON.parse(localStorage.getItem('data')).find(el => el == input.value)) {
            taskFunc(input.value)
            data.push(input.value)
            localStorage.setItem('data', JSON.stringify(data))
            deleteFunc(data)
            completeFunc(data)
        } else {
            alert('Такая задача уже есть')
        }
    })
})

const taskFunc = (text) => {
    const li = document.createElement('li')
    li.innerHTML = `${text}<div><button id="complete">Выполнить</button><button id="delete">Удалить</button></div>`
    tasks.appendChild(li)
}

const deleteFunc = (data) => {
    const deletes = document.querySelectorAll('#delete')
    deletes.forEach(del => {
        del.addEventListener('click', () => {
            let newData = [];
            data.forEach(task => {
                if (task != del.parentElement.parentElement.innerHTML.split('<')[0]) {
                    newData.push(task)
                }
            });
            data = newData
            del.parentElement.parentElement.remove()
            localStorage.setItem('data', JSON.stringify(data))
        })
    })
}

const completeFunc = (data) => {
    const completes = document.querySelectorAll('#complete')
    completes.forEach(del => {
        del.addEventListener('click', () => {
            let newData = [];
            data.forEach(task => {
                if (task != del.parentElement.parentElement.innerHTML.split('<')[0]) {
                    newData.push(task)
                }
            });
            data = newData
            del.parentElement.parentElement.classList.add('completed')
            setInterval(() => {
                del.parentElement.parentElement.remove()
            }, 5000)
            localStorage.setItem('data', JSON.stringify(data))
        })
    })
}