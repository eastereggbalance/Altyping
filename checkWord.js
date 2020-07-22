function empty()
{
    if(tpField.value === "")
    {
        var noInput = confirm("really? you done?");
        if(noInput)
        {
            nextContent();
        }
        else
        {
            return;
        }
    }
}