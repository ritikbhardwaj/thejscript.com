$(document).ready(() => {
    //settings of the ace editor
    var editor = ace.edit("input", {
        mode: "ace/mode/javascript",
        selectionStyle: "text"
    });
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
    });
    editor.session.setTabSize(4);
    editor.session.setUseSoftTabs(true);
    editor.setShowPrintMargin(false);
    document.getElementById('input').style.fontSize = '16px';


    $('button.run-btn').on('click', () => {
        var obj = {
            language: "js",
            code: editor.getValue()
        }
        //make a post request to the server with the code
        fetch("http://localhost:8000",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(obj)  //convert the object into string before sending
            }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.err === '') {
                    $('div.output').empty();
                    $('div.output').append(`<pre><h3>${responseJson.output}</h3></pre>`);
                } else if (responseJson.err !== '') {
                    $('div.output').empty();
                    $('div.output').append(`<pre><h3>${responseJson.err}</h3></pre>`);
                }
            }).catch((err) => {
                $('div.output').empty();
                $('div.output').append(`<pre><h3>${err}</h3></pre>`);
            });
    });
})