if (!localStorage.getItem('list')) localStorage.setItem('list', `[]`);

const list = document.getElementById('list');
const add = document.getElementById('add');
const clear = document.getElementById('clear');

if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (!darkModeMediaQuery.matches) {
        document.body.style.backgroundColor = '#fff';
    }
}

const load = () => {
    if (JSON.parse(localStorage.getItem('list')).length === 0) return list.innerHTML = '<label class="n">Nothing here yet. Add something to get started! Once you have added something, click it to copy the content and right-click to delete it.</label>'
    list.innerHTML = '';
    JSON.parse(localStorage.getItem('list')).forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = item;
        div.oncontextmenu = (e) => {
            e.preventDefault();
            if (!confirm('Are you sure you want to remove this item?')) return;
            const data = JSON.parse(localStorage.getItem('list'));
            const index = data.indexOf(item);
            data.splice(index, 1);
            localStorage.setItem('list', JSON.stringify(data));
            load();
        }
        div.onclick = () => {
            navigator.clipboard.writeText(item).then(() => {
                alert('Copied to clipboard!')
            }).catch(() => {
                alert('Failed to copy to clipboard!')
            });
        }
        list.appendChild(div);
    });
}

add.onclick = () => {
    const data = JSON.parse(localStorage.getItem('list'));
    const _prompt = prompt('Enter a new item');
    if (!_prompt) return;
    data.push(_prompt);
    localStorage.setItem('list', JSON.stringify(data));
    load();
}

clear.onclick = () => {
    if (!confirm('Are you sure you want to clear the list?')) return;
    localStorage.setItem('list', `[]`);
    load();
}

document.getElementById('h').onclick = () => {
    alert('Click an element to copy its content or right-click to delete it.')
}

load();