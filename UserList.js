var UserList = (function() {

    'use strict';

    var $userList, currentUser, userData;

    $(document).on('doc:clear-UserList-selection', function(e) {
        
        if(currentUser) {
            currentUser.classList.remove('selectedUser'); 
        }        
    });




    function loadUsers() {

        $.ajax('data/users.json', 
        
        {

            success: function(data, status) {

                $(document).trigger('doc:getData', data);

                userData = data;

                let id = 0;

                data.forEach(function(user) {
                    
                    // $(document).trigger('doc:getData', user); //pass data for each user. passing full data var doesn't work

                    $userList.append(createUser(user, id)); 
                    
                    id++;
                });
            },

        
            error: function(jqXHR, status, err) {
                console.log(err);
            },

            complete:function() {

                orderByAddress();
            }
        });
    }


    function clickUser(e) {
        e.preventDefault();

        toggleSelection(currentUser, e.target.parentNode);
        
        $(document).trigger('doc:userSelection', e.target); //call custom event to pass click event to UserDetail module for handling of data
    }


    function createUser(user, id) {

        let divUser = $('<div/>').addClass('user').attr('data-pos', id);

        let userName = $('<div/>')
            .addClass('user__name')
            .text(user.name);

        let userEmail = $('<div/>')
            .addClass('user__email')
            .text(user.email)


        divUser.append(userName).append(userEmail);

        return divUser;
    }


    function toggleSelection(oldSelection, currentSelection) {

        if(oldSelection) {
            oldSelection.classList.remove('selectedUser');  
        } 

        currentUser = currentSelection;
        currentUser.classList.add('selectedUser'); 
    }

    function orderByAddressPresent(data) {

        data.forEach(function(user) {
            // console.log(user);

            if(user.address !== undefined) {
                // console.log(user);
            }
        })
    }


    function orderByAddress() {
        userData.filter(function(user) {
            return user.address !== undefined;
        })
        .map(function(user) {
            return user.name;
        })
        .forEach(function(name) {
            // console.log(name);
            $(`.user__name:contains(${name})`).addClass('has-address');
        })

        $('.user__name').filter('.has-address').parent().remove().prependTo($('.user-list'));
    }







    function init() {

        cacheDOM();
        events();
        loadUsers(); //load user list once page is open

    }

    function events() {

        $userList.on('click', clickUser);
    }

    function cacheDOM() {

        $userList = $('.user-list');
    }



    // expose API
    return {
        init
    }




})();