const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Check if the target of the click event is the delete button
    if (event.target.classList.contains('delete-button')) {
      // Prevent the default action
      event.preventDefault();
      // Stop the event from propagating to other elements
      event.stopPropagation();
      // Get the form element
      const form = button.closest('form');
      // Submit the form
      form.submit();
    }
  });
});
