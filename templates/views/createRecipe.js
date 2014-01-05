extends ../layouts/base

block content

        .section
                .container
                        form(method='post', enctype='multipart/form-data', autocomplete='off', novalidate).form-horizontal.create-form.profile-form
                                input(type='hidden', name='action', value='create-recipe')
                                
                                .row: .col-sm-8.col-sm-offset-2
                                        
                                        //- Title
                                        .form-group
                                                h1 Create a Recipe
                                                input(type='text', id='recipe-title', name='title', placeholder='Recipe title').input.input-xl.input-faded
                                        
                                        
                                        //- Image
                                        .form-group
                                                label Upload image
                                                input(type='file', name='image_upload')
                                        
                                        //- Description
                                        .form-group
                                                label Description
                                                input(type='text', id='recipe-description', name='description', placeholder='Recipe description').input.input-xl.input-faded
                                        
                                        //- Ingredients
                                        .form-group
                                                label Ingredients
                                                textarea(name='ingredients', class='wysiwyg').input.input-faded
                                        
                                        //- Recipe Instructions
                                        .form-group
                                                label Recipe Instructions
                                                textarea(name='recipeInstructions', class='wysiwyg').input.input-faded
                                        
                                        
                                        //- Submit
                                        .form-group
                                                button(type='submit', data-loading-text="Changing...").btn.btn-lg.btn-primary.btn-block Create post
                                                
block js
        script(src='/js/lib/bootstrap/button.js')
        script(src='/js/lib/tinymce/tinymce.min.js')
        script(src='/js/lib/tinymce/jquery.tinymce.min.js')
        script.
                jQuery(function($) {
                        $( "#recipe-title" ).focus();
                        tinymce.init({
                                selector: 'textarea.wysiwyg',
                                menubar: false,
                                height: 400,
                                plugins: [ 'code', 'link' ],
                                toolbar: 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | link | code',
                                skin: 'keystone'
                        });
                });
