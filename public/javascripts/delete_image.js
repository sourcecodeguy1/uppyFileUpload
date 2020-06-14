
$(document).ready(function () {

    $('.btn_delete').on('click', function (e) {

        e.preventDefault();

        let delItem = $(this);

        let id = $(this).attr('data-id');
        let photoName = $(this).attr('data-photoName');

        /**MAKE AJAX REQUEST TO DELETE THE SELECTED IMAGE**/
        $.ajax({
            url: "/delete",
            type: "POST",
            dataType: "JSON",
            data: {id: id, photoName: photoName},
            success: function (data) {
                if(data.result === "success"){

                    delItem.parent().parent().remove();

                    /** COUNT THE NUMBER OF ROWS IN THE DATABASE.
                     *  RELOAD THE PAGE AFTER THE LAST PICTURE HAS
                     *  BEEN DELETED
                     **/
                    if(data.count <= 0){

                        window.location.href = '/gallery';

                    }

                }
            }
        });

    });

});