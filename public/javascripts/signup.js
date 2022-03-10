jQuery("#formReg").submit(function (event) {
  event.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200)
          setTimeout(() => {redirect('login');}, 5000*6);
  }
  xhr.open("POST", '/signup')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  const s = sch(crypto.getRandomValues(new Uint32Array(16)));
  const jsn = JSON.stringify(s.public)
  xhr.send(jsn)
  document.getElementById("init").innerHTML = "This is your private key. Keep it secret. Keep it safe. Page expires in 30 seconds.\r";
  document.getElementById("key").innerHTML = s.key.toString();
});
