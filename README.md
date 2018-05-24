jquery-fab
================

Material style floating action button with jQuery.

## How to use

Install via bower:

``` bash
bower install jquery-fab
```

Create a div to wrap the FAB:

``` html
<div id="wrapper"></div>
```

Call the jqueryFab function:

``` javascript

var buttons = [
            //The button at index 0 is the main button
            {
                "bgcolor":"#2980b9",
                "icon":"+"
            },
            //Starting from index 1 buttons are on the hide/show menu
            {
                "href":"http://www.example.com",
                "bgcolor":"#f1c40f",
                "color":"fffff",
                "icon":"<i class='fa fa-pencil'></i>",
                "target":"_blank",
                "title": "Link 1"
            },
            {
                "href":"http://www.example.com",
                "bgcolor":"#2ecc71",
                "color":"#fffff",
                "target":"_blank",
                "icon":"<i class='fa fa-comment'></i>",
                "title": "Link 2"
            },
            {
                "bgcolor":"#e74c3c",
                "color":"#fffff",
                "icon":"A",
                "onclick": function(){alert("You have pressed the fab A!")},
                "title": "Alert"
            }
        ];
        var options = {
            rotate: true
        };
        $('#wrapper').jqueryFab(buttons, options);
```

There's an example on the page [jquery-fab.html](https://cdn.rawgit.com/robertsLando/jquery-fab/f9c854ef/jquery-fab.html).

## Copyright and license

The license is available within the repository in the [LICENSE](https://github.com/jeffersonrpn/jquery-fab/blob/master/LICENSE.md) file.
