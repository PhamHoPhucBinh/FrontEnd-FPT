$(document).ready(function () {
    // Show Edit Profile form by default
    $('#editProfile').show();
    $('#addContent, #contentList').hide();



    // Array to hold content entries
    let contentData = [];

    // Navigation links click event
    $('#viewProfile').click(function () {
        $('#editProfile').show();
        $('#addContent, #contentList').hide();
    });

    $('#formContent').click(function () {
        $('#addContent').show();
        $('#editProfile, #contentList').hide();
    });

    $('#viewContent').click(function () {
        $('#contentList').show();
        $('#editProfile, #addContent').hide();
        renderContentTable();
    });

    // Handle profile form submissions with AJAX (example for demonstration only)
    $('#profileForm').on('submit', function (e) {
        e.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'process_profile.php', // dummy URL for demonstration
            data: formData,
            success: function (response) {
                alert('Profile submitted: ' + response);
            }
        });
    });

    // // Array to hold content entries, with auto-incrementing ID
    let currentID = 1; // Initialize ID counter

    // Handle content form submissions
    $('#contentForm').on('submit', function (e) {
        e.preventDefault();
        let formData = $(this).serializeArray();
        let content = {
            id: currentID++,
            title: formData.find(item => item.name === 'title').value,
            brief: formData.find(item => item.name === 'brief').value,
            content: formData.find(item => item.name === 'content').value
        };
        contentData.push(content); // Add content to the array
        alert('Content added successfully!');
        $(this).trigger('reset'); // Reset form fields
    });

    // Function to render content table
    function renderContentTable() {
        let tbody = $('#contentTable tbody');
        tbody.empty(); // Clear existing rows
        contentData.forEach((item, index) => {
            tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.title}</td>
                    <td>${item.brief}</td>
                    <td>${item.content}</td>
                </tr>
            `);
        });
    }
});
