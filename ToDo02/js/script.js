/*
    This function will create a new task list item and also
    append it to the <ul id="list"> unordered list element.
    It is called when the user clicks the Add button or when
    the user hits the <enter> key.
 */
function addNewTask()
{
    //  input will hold the current task
    const input = document.getElementById("task");

    /*
      text will hold the input with the leading
      and trailing spaces removed.
     */
      const text = input.value.trim();

    //  If nothing was inputtd into the input
    //  just return.
    if (!text)
    {
        return;
    }

    /*
        If we get this far, something was added
        to the input, i.e. a new task was created.

        This new task will be added as a new list
        item (li). So create a new list item here.
     */
    const li = document.createElement("li");

    /*
        Create a <span> element to hold the task text.

        NOTE: Using a <span> here as opposed to setting
              the text directly on the li itself will
              let us style the text with CSS if desired.
     */
    const span = document.createElement("span");

    //  Set the <span> text to the trimmed input value.
    span.textContent = text;

    //  Create a delete button next to each task.
    const removeBtn = document.createElement("button");

    //  Use an "X" plus a space and the word delete
    //  as the button label
    removeBtn.textContent = "X Delete";

    /*
        Assign the "remove" class to the button,
        again for possible CSS styling purposes.
     */
    removeBtn.className = "remove";

    /*
        Add aria-label for screen readers to read
        a description instead of reading the "X".
     */
    removeBtn.setAttribute("aria-label", "Delete task");

    /*
        If the remove button is clicked, ask the user
        if s/he actually wants the task to be deleted.
        If so, remove the list item (li) from the DOM.
        This will in effect remove the task.
     */
    removeBtn.onclick = function()
    {
        showConfirm(text, function () 
        {
            li.remove();
        });
    };

    /*  
        Attach the text span and remove button to
        the li.
     */
    li.appendChild(span);
    li.appendChild(removeBtn);

    /*
        Append the fully constructed li to the
        task list in the DOM.
    */
   document.getElementById("list").appendChild(li);

   //   Clear the input field for a new task.
   input.value = "";

   //   Return the focus to the input field.
   input.focus();
}

//  New for version02
//  Function to display the delete confirmation modal overlay
function showConfirm(taskText, onConfirm)
{
    //  Locate overlay backup and message element
    //  inside of the dialog.
    const overlay = document.getElementById("confirmOverlay");
    const msgElem = document.getElementById("confirmMsg");

    //  Truncate long task names
    const display = taskText.length > 50 ? taskText.slice(0, 47) + "\u2026"
                                         : taskText;
    alert(display);
    msgElem.textContent = `"${display}"`;

    //  Make the overlay visible
    overlay.classList.add("visible");

    //  Locate the Yes and No buttons inside of the dialog.
    const yesBtn = document.getElementById("confirmYes");
    const noBtn  = document.getElementById("confirmNo");

    //  Clone both buttons
    const newYes = yesBtn.cloneNode(true);
    const newNo  = noBtn.cloneNode(true);

    //  Replace original buttons with the clones
    yesBtn.parentNode.replaceChildren(newYes, newNo);

    //  If user clicked yes, hide the overlay and
    //  then remove the corresponding li.
    newYes.addEventListener("click", function()
    {
        overlay.classList.remove("visible");
        onConfirm();
    });

    //  If the clicked no, hide the overlay and
    //  do not delete anything.
    newNo.addEventListener("click", function()
    {
        overlay.classList.remove("visible");
    });

    //  Let the user dismiss the dialog if desired
    overlay.addEventListener("click", function handleBackdrop(e)
    {
        if (e.target === overlay)
        {
            overlay.classList.remove("visible");
            overlay.removeEventListener("click", handleBackdrop);
        }
    });

    //  Set the focus to the No button when the dialog opens.
    newNo.focus();
}

//  Allow pressing <enter> to add the task.
document.addEventListener("DOMContentLoaded", function()
{
    /*
        After the DOM is loaded, attach the 
        event listeners, ensuring that the "task"
        input element exists when we try to
        access it.
     */
    document.getElementById("task").addEventListener("keydown", function(e)
    {
       /*
            Check if the user pressed the <enter>
            key. If so, trigger the addNewTask()
            function so the user doe not have to
            manually click the Add button.
         */
        if (e.key === "Enter")
        {
            addNewTask();
        } 
    });

    document.addEventListener("keydown", function(e)
    {
       /*
            Check if the user pressed the <Esc>
            key. If so, close the confirm box.
         */
        if (e.key === "Escape")
        {
            document.getElementById("confirmOverlay").classList.remove("visible");
        } 
    });
});