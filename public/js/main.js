(() => {
  const socket = io();
      //variables
  let messageList = document.querySelector('ul');
      chatForm = document.querySelector('form');
      nameInput = document.querySelector('.nickname');
      chatMessage = document.querySelector('.message');
      nickName = null;
      //functionality

      function setNickname(msg) {
        //debugger;
        nickName = this.value;
      }

      function handleSendMessage(e) {
        e.preventDefault(); //block default behaviour (page refresh)
        //ternary - > check to see if the variable exists and handle it if it does or doesnt, true is to the left of the colon, false is to the right.
        nickName = (nickName && nickName.length > 0) ? nickName : 'user';
        //grab the text from the input field at the bottom of the page.
        msg = `${nickName} says ${chatMessage.value}`;
        //emit a chat event so that we can pass it through to the server (and everyone else)
        socket.emit('chat message', msg);
        chatMessage.value = '';
        return false;
      }

      function appendMessage(msg) {
        //debugger;
        let newMsg = `<li>${msg.message}</li>`;
        messageList.innerHTML += newMsg;
      }

      function appendDiscMessage(msg) {
        //debugger;
        let newMsg = `<li>${msg}</li>`;
        messageList.innerHTML += newMsg;
      }

      //listeners
      nameInput.addEventListener('change', setNickname, false);
      chatForm.addEventListener('submit', handleSendMessage, false);
      socket.addEventListener('chat message', appendMessage, false);
      socket.addEventListener('disconnect message', appendDiscMessage, false);
})();
