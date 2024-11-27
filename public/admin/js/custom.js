$(document).ready(function(){
    $(".nav-item").removeClass("active");
    $(".nav-link").removeClass("active");
// التحقق اذا كلمة سر الادمن صحيحة او لا
$("#current_password").keyup(function(){
    var current_password = $("#current_password").val();
    // alert(current_password);
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:'post',
        url:'/admin/check-admin-password',
        data:{current_password:current_password},
        success:function(resp){
            if(resp=="false"){
                $("#check_password").html("<font color='red'>Current Password is Incorrect!</font>");
            }else if(resp=="true"){
                $("#check_password").html("<font color='green'>Current Password is Correct!</font>");
            }
        },error:function(){
            alert('Error');
        }
    });
})

   // تحديث حالة الادمن
   $(document).on("click",".updateAdminStatus",function(){
    var status = $(this).children("i").attr("status");
    var admin_id = $(this).attr("admin_id");
    alert("Status updated successfully");
        $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type:'post',
        url:'/admin/update-admin-status',
        data:{status:status,admin_id:admin_id},
        // success: function(resp) {
        //     console.log(resp); // طباعة الاستجابة للتحقق منها
        //     alert("Status updated successfully: " + resp.status);
        // },
        // error: function(xhr, status, error) {
        //     console.error("Error details:", xhr, status, error);
        //     alert("Error: " + error);
        // }
        success:function(resp){
            // alert(resp);
            if(resp['status']==0){
                $("#admin-"+admin_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-outline' status='Inactive'></i>");
            }else  if(resp['status']==1){
                $("#admin-"+admin_id).html("<i style='font-size:30px' class='mdi mdi-bookmark-check' status='Active'></i>");
            }
        }
        // , error:function(){
        //     alert("Error");
        // }
    })

});
// $(document).on("click", ".updateAdminStatus", function() {
//     console.log("Button clicked"); // للتأكد أن النقر يعمل
//     var status = $(this).children("i").attr("status");
//     var admin_id = $(this).attr("admin_id");
//     console.log("Status:", status, "Admin ID:", admin_id); // عرض القيم قبل الإرسال

//     $.ajax({
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         },
//         type: 'post',
//         url: '/admin/update-admin-status',
//         data: { status: status, admin_id: admin_id },
//         success: function(resp) {
//             console.log("Response:", resp); // عرض الرد في وحدة التحكم
//             alert("Status updated successfully");
//         },
//         error: function(err) {
//             console.error("Error:", err); // عرض الخطأ في وحدة التحكم
//             alert("Error occurred while updating status");
//         }
//     });
// });

});