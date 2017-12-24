var UserDetail = (function() {

    'use strict';

    var userData;
    var currentUser, pos, $btn, $userDetail, $pleaseSelectUser;

    //custom event for grabbing data from UserList module. Now we dont have to make anymore ajax calls after initial ajax call from UserList module
    $(document).on('doc:getData', function(e, ...data) {

       userData = data;
    //    console.log(userData);

    });

    //display data as a custom event. reduces coupling of modules. called from UserList
    $(document).on('doc:userSelection', function(e, data) {
        
            loadUserDetail(data);       
    });


    function loadUserDetail(user) {


        if(user.parentNode.classList.contains('user')) { //make sure we get the user parent so that we can grab the correct data attr

            pos = user.parentNode.getAttribute('data-pos');

            currentUser = userData[pos];

            constructUserDetail(currentUser)
        }
    }


    function constructUserDetail(user) {

        //deconstruct object all except address since not all have the address object
        var {
            name,
            username,
            email,
            website,
            phone, 
            company: {
                name: companyName,
                catchPhrase,
                bs
            }  
        } = user;

        var street, suite, city, zipcode;

        for(var prop in user) {

            if(prop === 'address') {
                street = user.address.street || "";
                suite = user.address.suite || "";
                city = user.address.city || "";
                zipcode = user.address.zipcode || "";
            }
        }


        if( $('.user-detail').hasClass('hidden')) {
            $('.user-detail').removeClass('hidden');
        }


        $('.contact').contents().not(':first').remove();
        $('.contact')
            .append(createUserElements('contact', name, 'contact__item', 'Name'))
            .append(createUserElements('contact', username, 'contact__item', "Username"))
            .append(createUserElements('contact', email, 'contact__item', "Email"))
            .append(createUserElements('contact', website, 'contact__item', "Website"))
            .append(createUserElements('contact', phone, 'contact__item', "Contact"));

        //construct address section
        $('.address').contents().not(':first').remove();
        $('.address')
            .append(createUserElements('address', street, 'address__item', ''))
            .append(createUserElements('address', suite, 'address__item', ''))
            .append(createUserElements('address', city, 'address__item', ''))
            .append(createUserElements('address', zipcode, 'address__item', ''))

        //construct company info section
        $('.company-profile').contents().not(':first').remove();
        $('.company-profile')
            .append(createUserElements('company-profile', companyName, 'company-profile__item', ''))
            .append(createUserElements('company-profile', bs, 'company-profile__item', ''))
            .append(createUserElements('company-profile', catchPhrase, 'company-profile__item', ''))

        
        // make clear selection button appear and user detail section 
        $userDetail.show();
        $btn.show();
        $pleaseSelectUser.hide();

    }


    function createUserElements(section, item, cls, field) {

        let divItem;

        if(section === 'contact') {

            divItem = $('<div/>').addClass(cls)
                .append(`${field}: ${item}`)

        
                return divItem;
                
        } else if (section === 'address' || section === 'company-profile') {

            if(item) {
                divItem = $('<div/>').addClass(cls)
                .append(`${item}`)  

            } else {
                
                divItem = '';
            }
   
            return divItem;

        } else {

        }

    }

    function clearUserDetail() {

        
        $('.contact').contents().not(':first').remove();
        $('.address').contents().not(':first').remove();
        $('.company-profile').contents().not(':first').remove();

        //clear the UserList selection highlight in UserList module
        $(document).trigger('doc:clear-UserList-selection', '');

        //hide clear selection button and user detail
        $btn.hide();
        $userDetail.hide();
        $pleaseSelectUser.show();

    }











    function init() {

        console.log('initialized UserDetail module');
        cacheDOM();
        $btn.hide();
        events();

    }


    function cacheDOM() {

        $btn = $('.btn');
        $userDetail = $('.user-detail');
        $pleaseSelectUser = $('.pleaseSelectUser');
    }


    function events() {

        $btn.on('click', clearUserDetail);
    }



    return {
        init
    }


})();