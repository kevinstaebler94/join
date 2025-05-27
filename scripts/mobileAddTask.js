/**
 * Adjusts the layout of the submit section and mobile info area
 * based on the current window width. If the screen width is 
 * 850px or less, elements are rearranged for mobile view.
 */
function checkWindowSize() {
    if (window.innerWidth <= 850) {
        let submitSection = document.getElementById('submitSection');
        let mobileInfo = document.getElementById('mobileInfo');
        submitSection.innerHTML = `<div class="submitBtnContainer">
                                <span class="submitBtn clearBtn hoverBtn" onclick="clearAddTask()">Clear
                                    <img class="submitIcons" src="./assets/img/cancelIcon.svg" alt="">
                                    <img class="submitIcons" src="./assets/img/cancelIconHover.svg" alt="">
                                </span>
                                <span class="submitBtn checkBtn hoverBtn" onclick="checkValidation()">Create Task
                                    <img class="submitIcons" src="./assets/img/createIcon.svg" alt="">
                                </span>
                            </div>`;
        mobileInfo.innerHTML = `<div class="infoText">
                                <p>
                                <p class="fontRed">*</p>This field is required</p>
                            </div>`;
    } else {
        submitSection.innerHTML = `<div class="infoText">
                                <p>
                                <p class="fontRed">*</p>This field is required</p>
                            </div>

                            <div class="submitBtnContainer">
                                <span class="submitBtn clearBtn hoverBtn" onclick="clearAddTask()">Clear
                                    <img class="submitIcons" src="./assets/img/cancelIcon.svg" alt="">
                                    <img class="submitIcons" src="./assets/img/cancelIconHover.svg" alt="">
                                </span>
                                <span class="submitBtn checkBtn hoverBtn" onclick="checkValidation()">Create Task
                                    <img class="submitIcons" src="./assets/img/createIcon.svg" alt="">
                                </span>
                            </div>`;
        mobileInfo.innerHTML = '';
    }
}

window.addEventListener('DOMContentLoaded', checkWindowSize);
window.addEventListener('resize', checkWindowSize);
