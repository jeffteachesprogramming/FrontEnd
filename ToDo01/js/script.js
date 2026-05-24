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

        This new task will be added a new list
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
    span.textContent = text + "\u00A0\u00A0";

    //  Create a remove button next to each task.
    const removeBtn = document.createElement("button");

    //  Use an "X" as the button label
    removeBtn.textContent = "X";

    /*
        Assign the "remove" class to the button,
        again for possible CSS styling purposes.
     */
    removeBtn.className = "remove";

    /*
        Add aria-label for screen readers to read
        a description instead of reading the "X".
     */
    removeBtn.setAttribute("aria-label", "Remove task");

    /*
        If the removed button is clicked, delete the
        list item (li) from the document object model
        (DOM). This will in effect remove the task.
     */
    removeBtn.onclick = function()
    {
        li.remove();
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

//  Allow pressing <enter> to add the task.
document.addEventListener("DOMContentLoaded", function()
{
    /*
        After the DOM is loaded, attach the 
        event listeners, ensuring that the "task"
        input element exists when we try to
        access it.
     */
    document.getElementById("task")  .addEventListener("keydown", function(e)
    {
       /*
            Check if the user pressed the <enter>
            key. If so, trigger the addNewTask()
            function so the user doe not have to
            manually click the Add button.
         */
        if (e.key == "Enter")
        {
            addNewTask();
        } 
    });
});