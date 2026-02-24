export function setButtonText(button, isLoading, defaultText = "Save") {
  let loadingText = defaultText.slice(0, -1) + "ing ...";

  if (isLoading) {
    button.textContent = `${loadingText}`;
  } else {
    button.textContent = `${defaultText}`;
  }
}