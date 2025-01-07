"use strict";

let number = 0;  // 表示中のメッセージ数
const bbs = document.querySelector('#bbs');

// 投稿処理
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    if (name === "" || message === "") {
        alert("名前とメッセージを入力してください");
        return;
    }

    const params = {
        method: "POST",
        body: `name=${name}&message=${message}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(() => {
            document.querySelector('#message').value = "";  // メッセージ欄をクリア
            document.querySelector('#name').value = "";  // 名前欄をクリア
        })
        .catch(error => {
            console.error(error);
        });
});

// メッセージを読み込む関数
function loadMessages() {
    bbs.innerHTML = '';  // 現在の掲示板内容をクリア

    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    
    const url = "/read";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            // サーバから取得したメッセージを全て表示
            response.messages.forEach((mes) => {
                displayMessage(mes);  // メッセージを表示
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// メッセージを画面に表示
function displayMessage(mes) {
    let cover = document.createElement('div');
    cover.className = 'cover';
    cover.dataset.id = mes.id;  // IDをデータ属性として設定

    let name_area = document.createElement('span');
    name_area.className = 'name';
    name_area.innerText = mes.name;

    let mes_area = document.createElement('span');
    mes_area.className = 'mes';
    mes_area.innerText = mes.message;

    // 削除ボタン
    let deleteButton = document.createElement('button');
    deleteButton.innerText = '削除';
    deleteButton.addEventListener('click', () => deleteMessage(mes.id));

    // 編集ボタン
    let editButton = document.createElement('button');
    editButton.innerText = '編集';
    editButton.addEventListener('click', () => editMessage(mes.id, mes.name, mes.message));

    // いいねボタン
    let likeButton = document.createElement('button');
    likeButton.innerText = `いいね (${mes.likes || 0})`;
    likeButton.addEventListener('click', () => likeMessage(mes.id, likeButton));

    cover.appendChild(name_area);
    cover.appendChild(mes_area);
    cover.appendChild(deleteButton);
    cover.appendChild(editButton);
    cover.appendChild(likeButton); // ここで「いいね」ボタンを追加

    bbs.appendChild(cover);
}

// メッセージを削除
function deleteMessage(id) {
    const params = {
        method: "POST",
        body: `id=${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = `/deleteBbs`;
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(() => {
            loadMessages();  // 削除後にメッセージを再読み込み
        })
        .catch(error => {
            console.error(error);
        });
}

// メッセージを編集
function editMessage(id, currentName, currentMessage) {
    const newMessage = prompt("新しいメッセージを入力してください:", currentMessage);

    if (newMessage !== null && newMessage !== '') {
        const params = {
            method: 'POST',
            body: `id=${id}&message=${encodeURIComponent(newMessage)}`,  // メッセージ内容のみ更新
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const url = `/editBbs`;
        fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(() => {
                loadMessages();  // 更新後にメッセージを再読み込み
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        alert("メッセージを入力してください。");
    }
}

// いいね処理
function likeMessage(id, likeButton) {
    const params = {
        method: 'POST',
        body: `id=${id}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch(`/likeBbs`, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((data) => {
            likeButton.innerText = `いいね (${data.likes})`;  // いいね数を更新
        })
        .catch(error => {
            console.error(error);
        });
}

// 投稿チェック（新しいメッセージがあれば読み込む）
document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            if (number !== value) {
                const params = {
                    method: "POST",
                    body: `start=${number}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            displayMessage(mes);  // 新しいメッセージを表示
                        }
                    });
            }
        })
        .catch(error => {
            console.error(error);
        });
});

// 初期メッセージを読み込む
loadMessages();
