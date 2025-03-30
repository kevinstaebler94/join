function signUpTemplate() {
  return `
    <div id="signUpOverlay" class="signUpOverlay dNone">
      <span>You signed up successfully</span>
    </div>
    <img class="heroLogo" src="./assets/img/joinLogoSmall.svg" alt="">
    <main id="contentSignUp" class="contentSignUp">
      <div class="signUpContainer">
        <img onclick="updateContent('login')" class="returnArrow" src="./assets/img/returnArrow.svg" alt="">  
        <h2>Sign up</h2>
        <hr class="hr">
        <form onsubmit="signUp(event)"; return false">
          <div class="inputWrapper">
            <input id="name" class="inputfield" type="text" placeholder="Name" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/person.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="email" class="inputfield" type="text" placeholder="Email" oninput="toggleSignUpButton()">
            <img class="inputIcon" src="./assets/img/mail.svg" alt="">
            <span id="errorMsgEmail" class="errorMsgEmail hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="password" class="inputfield password" type="password" placeholder="Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('password')" class="inputIcon passwordIcon" src="./assets/img/lock.svg" alt="">
            <span class="hide">Placeholder</span>
          </div>
          <div class="inputWrapper">
            <input id="confirmedPassword" class="inputfield password" type="password" placeholder="Confirm Password" oninput="toggleSignUpButton()">
            <img onclick="togglePasswordVisibility('confirmedPassword')" class="inputIcon passwordIcon" src="./assets/img/lock.svg" alt="">
            <span id="errorMsgPassword" class="errorMsgPassword hide">Your passwords don't match. Please try again.</span>
          </div>
          <div class="checkPrivacyPolicy">
            <input id="checkbox" class="checkbox" type="checkbox" onchange="toggleSignUpButton()">
            <span>I accept the <span class="hightlight">Privacy Policy</span> </span>
          </div>
          <div class="buttonWrapper">
            <button disabled id="signUpButton" class="button signUpButton">Sign up</button>
          </div>
        </form>
      </div>
    </main>
    <footer class="legalLinks">
      <span class="privacyPolicy">Privacy Policy</span>
      <span class="legalNotice">Legal notice</span>
    </footer>
  `
}