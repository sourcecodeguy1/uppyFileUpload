// Import the plugins
const Uppy = require('@uppy/core');
const XHRUpload = require('@uppy/xhr-upload');
const Dashboard = require('@uppy/dashboard');


const uppy = Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
        maxFileSize: 5000000,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*']
    }
})
    .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '#drag-drop-area',
        replaceTargetContent: true,
        showProgressDetails: true,
        proudlyDisplayPoweredByUppy: false,
        animateOpenClose: true,
        note: 'Images or videos only, 1–3 files, up to 5 MB',
        height: 470,
        browserBackButtonClose: true,
        theme: 'dark'
        /*metaFields: [
            {id: 'caption', name: 'Caption', placeholder: 'describe what the image is about'}
        ]*/
    });

uppy.use(XHRUpload, {
    id: 'XHRUpload',
    endpoint: '/upload',
    method: 'POST',
    formData: true,
    fieldName: 'my_file',
    //metaFields: ['caption'],
    bundle: true,
});


uppy.on('upload-success', (file, response) => {

    window.location.href = '/gallery';

});

module.exports = uppy;