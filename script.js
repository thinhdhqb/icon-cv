// Sidebar
$('#toggle').click(function() {
    $('#sidebar ul').toggle('slide', complete=function() {
        var text = $('#toggle').text().trim();
        console.log(text);
        console.log(text == 'chevron_left');
        if (text == 'chevron_left') {
            $('#toggle').html('<span class="material-icons">' +
        'chevron_right' +
        '</span>');
        } 
        else $('#toggle').html('<span class="material-icons">' +
        'chevron_left' +
        '</span>');
    });
});

$('#sidebar input[type=checkbox]').change(function() {
    let target = $(this).attr('id').replace('-checkbox', '');
    if($(this).is(':checked')) $('#' + target).css('display', 'block');
    else $('#' + target).css('display', 'none');
});
// Change CV font size
function changeFontSize(direction) {
    let max = 19;
    let min = 13;
    let currentSize = $('#cv').css('font-size');
    currentSize = parseInt(currentSize.slice(0, currentSize.length-2), 10);
    let nextSize;
    if (direction === '+' && currentSize < max) nextSize = currentSize + 1;
    else if (direction === '-' && currentSize > min) nextSize = currentSize - 1;
    $('#cv').css('font-size', `${nextSize}px`);
} 

// Change cv's font
$('#font').change(function() {
    var font = $('#font').val();
    $('*:not(.toolbar *, .material-icons)').css('font-family', font);
})

// Change theme color
$('.color').click(function() {
    var color = $(this).attr('id');
    $(':root').css('--theme-color', `var(--${color})`);
})

$('#custom-color').on('input', function() {
    let color = $(this).val();
    $(':root').css('--theme-color', color);
    let R = parseInt(color.slice(1,3), 16)/255;
    let G = parseInt(color.slice(3,5), 16)/255;
    let B = parseInt(color.slice(5), 16)/255;
    let luminance = (0.299*R + 0.587*G + 0.114*B); // ref: https://www.w3.org/TR/AERT/#color-contrast
    let fontColor = luminance > 0.5 ? 'black' : 'white';
    $('.left-container').css('color', fontColor);
});

// Reset cv to default
$('#reset-btn').click(function() {
    localStorage.clear();
    window.location.reload();
});

// Disable spellcheck
$("*").attr("spellcheck", "false");

// Upload image
$('#upload-btn').click(function() {
    $('#img-upload').click();
})

$('#img-upload').change(function(e) {
    if (e.target.files.length) {
        var imgSrc = URL.createObjectURL(e.target.files[0]);
        // $('.img-container').css('background-image', `url(${src})`);
        $('.img-container').css('background-image', `url(${imgSrc})`);
    }
})

// Save as PDF
$('#download-btn').click(function() {
    // Fix pdf not taking input elements
    $('#loading').show();
    setTimeout(function() {
        $('#loading').hide();
    }, 3000);
    $('.skill').each(function() {
        let val = $(this).find('input').val();
        console.log(val);
        let html = '<div class="skill-value" style="width: ' + val + '%;"></div>';
        $(this).find('.slider-container').append(html);
    })
    html2canvas(document.querySelector('#cv'), {scale: 3}).then(canvas => {
        var doc = new jsPDF('portrait', 'mm', 'a4');
        var imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
        doc.save('cv.pdf')
    });
    $('.skill .skill-value').remove();
});

// Adding functions
function addSkills(name='Kĩ năng', value='50') {
    let html = '<li>' +
    '<div class="skill">' +
      '<div contenteditable class="skill-name">' + name +'</div>'+
      '<div class="slider-container">'+
        '<input type="range" step="10" min="0" max="100" value="' + value + '" class="slider">' +
      '</div>' +
    '</div>' +
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>' +
    '</li>';
    $('#skills .content > ul').append(html);
}

function addExperience(title='Vị trí', company='Tên công ty', time='Thời gian', description='<li>Mô tả</li>') {
    let html = '<li>' +
    '<span contenteditable class="section-title job-title">' + title + '</span>' +
    '<span class="dot"> • </span>' +
    '<span contenteditable class="company" style="font-weight: bold">' + company + '</span>' +
    '<div contenteditable class="time">' + time + '</div>' +
    '<div contenteditable class="description">' + 
    '<ul>' +
        description + 
    '</ul>' +
    '</div>' +
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>' +
    '</li>';
    console.log(title);
    $('#work-experience .content > ul').append(html);
}

function addEducation(name='Tên trường', time='Thời gian', description='<li>Mô tả</li>') {
    let html = '<li>' +
    '<div contenteditable class="section-title school">' + name + '</div>' +
    '<div contenteditable class="time">' + time + '</div>' +
    '<div contenteditable class="description">' + 
    '<ul>' +
        description + 
    '</ul>' +
    '</div>' +
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>' +
    '</li>';
    $('#education .content > ul').append(html);
};

function addAwards(content='Giải thưởng') {
    let html = '<li contenteditable>' + content + 
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>' +
    '</li>';
    $('#awards .content > ul').append(html);
};

function addProjects(content='<div class="section-title" contenteditable>Tên dự án</div>' + 
'<div contenteditable class="time">Thời gian</div>' +
'<ul>' +
'<li>Mô tả</li>' +
'</ul>') {
    let html = '<li contenteditable>' + content + 
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>'+
    '</li>';
    $('#projects .content > ul').append(html);
}

function addCertificates(content='Chứng chỉ') {
    let html = '<li contenteditable>' + content + 
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>'+
    '</li>';
    $('#certificates .content > ul').append(html);
}

function addReferences(content='<div contenteditable class="section-title">Tên người tham chiếu</div>' + 
        '<div contenteditable>Chức vụ</div>' +
        '<div contenteditable>Nơi làm việc</div>' +
        '<div contenteditable>Mối quan hệ</div>' +
        '<div contenteditable>Tel</div>' +
        '<div contenteditable>Email</div>') {
    let html = '<li>' + content + 
    '<span contenteditable="false" class="material-icons remove-item">delete_outline</span>'+
    '</li>';
    $('#references .content > ul').append(html);
}

// add items in container
$('.add-item').click(function() {
    var title = $(this).parent().parent().attr('id')
    if (title == 'work-experience') addExperience();
    else if (title == 'education') addEducation();
    else if (title == 'awards') addAwards();
    else if (title == 'projects') addProjects();
    else if (title == 'certificates') addCertificates();
    else if (title == 'references') addReferences();
    else if (title == 'skills') addSkills();
    // content.children('ul').append(html);

});

setInterval(function() {
    $('.remove-item').click(function() {
        $(this).parent().remove();
    })
}, 1000);




// Save user's data locally
function saveData() {
    var font = $('#font').val();
    var fontSize = $('#cv').css('font-size');
    var themeColor = $(':root').css('--theme-color');
    var imgSrc = $('.img-container').css('background-image');
    var fullName = $('#full-name').text();
    var job = $('#job-title-header').text();
    var about = $('#about .content').text();
    var skills = {};
    $('.skill').each(function() {
        let title = $(this).find('.skill-name').text();
        let value = $(this).find('input').val();
        skills[title] = value;
    });
    var contact = {};
    $('#contact > .content > div').each(function() {
        let key = $(this).attr('id');
        let value = $(this).find('span[contenteditable]').text();
        contact[key] = value;
    })
    var experience = [];
    $('#work-experience .content > ul > li').each(function() {
        let title = $(this).find('.job-title').text();
        let company = $(this).find('.company').text();
        let time = $(this).find('.time').text();
        let description = $(this).find('.description > ul').html();
        let job = {
            'title': title,
            'company': company,
            'time': time,
            'description': description
        };
        experience.push(job);
    })
    var education = [];
    $('#education .content > ul > li').each(function() {
        let schoolName = $(this).find('.school').text();
        let time = $(this).find('.time').text();
        let description = $(this).find('.description > ul').html();
        let school = {
            'name': schoolName,
            'time': time,
            'description': description
        };
        education.push(school);
    });
    var awards = [];
    $('#awards .content > ul > li').each(function() {
        awards.push($(this).text().replace('delete_outline', ''));
    });
    var projects = [];
    $('#projects .content > ul > li').each(function() {
        projects.push($(this).html());
    });
    var certificates = [];
    $('#certificates .content > ul > li').each(function() {
        certificates.push($(this).text().replace('delete_outline', ''));
    });
    var references = [];
    $('#references .content > ul > li').each(function() {
        references.push($(this).html());
    });
    var uncheckedContent = [];
    $('#sidebar input[type=checkbox]').not('input:checked').each(function() {
        uncheckedContent.push($(this).attr('id'));
    });
    
    // console.table(experience)
    // console.table(skills);
    console.table(contact);
    // console.table(education);
    // console.table(awards);
    // console.table(projects);
    // console.table(certificates);
    // console.table(references);
    console.log('updated');
    localStorage.setItem('font', font);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('saved', true);
    localStorage.setItem('imgSrc', imgSrc)
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('job', job);
    localStorage.setItem('about', about);
    localStorage.setItem('skills', JSON.stringify(skills));
    localStorage.setItem('contact', JSON.stringify(contact));
    localStorage.setItem('experience', JSON.stringify(experience));
    localStorage.setItem('education', JSON.stringify(education));
    localStorage.setItem('awards', JSON.stringify(awards));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('certificates', JSON.stringify(certificates));
    localStorage.setItem('references', JSON.stringify(references));
    localStorage.setItem('uncheckedContent', JSON.stringify(uncheckedContent));
};

function getObject(s) {
    var object = localStorage.getItem(s);
    return JSON.parse(object);
}

function getLocalData() {
    // Get data from local storage
    var font = localStorage.getItem('font');
    var fontSize = localStorage.getItem('fontSize');
    var themeColor = localStorage.getItem('themeColor');
    var imgSrc = localStorage.getItem('imgSrc');
    var fullName = localStorage.getItem('fullName');
    var job = localStorage.getItem('job');
    var about = localStorage.getItem('about');
    var skills = getObject('skills');
    var contact = getObject('contact');
    var experience = getObject('experience');
    var education = getObject('education');
    var awards = getObject('awards');
    var projects = getObject('projects');
    var certificates = getObject('certificates');
    var references = getObject('references');
    var uncheckedContent = getObject('uncheckedContent');

    // Display data
    for (let item in uncheckedContent) {
        console.log(uncheckedContent[item])
        $('#' + uncheckedContent[item]).removeAttr('checked');
        let id = uncheckedContent[item].replace('-checkbox', '');
        $('#' + id).css('display', 'none');
    }

    $(':root').css('--theme-color', themeColor);
    $('#cv').css('font-size', fontSize);
    $('#font').val(font);
    $('*:not(.toolbar *, .material-icons, .fab, .fas)').css('font-family', font);
    $('.img-container').css('background-image', imgSrc);
    $('#full-name').text(fullName);
    $('#job-title-header').text(job);
    $('#about .content').text(about);
    for (let skill in skills) {
        addSkills(skill, skills[skill]);
    }
    for (let id in contact) {
        $('#' + id + ' > span[contenteditable]').text(contact[id]);
    }
    for (let item in education) {
        let obj = education[item];
        addEducation(obj.name, obj.time, obj.description);
    }
    for (let item in experience) {
        let obj = experience[item];
        addExperience(obj.title, obj.company, obj.time, obj.description);
    }
    awards.forEach(e => addAwards(e));
    projects.forEach(e => addProjects(e));
    certificates.forEach(e => addCertificates(e));
    references.forEach(e => addReferences(e));
}

// Retrieve user's data
window.onload = function() {
    $('#loading').hide();
    console.log($('#loading'));
    let saved = localStorage.getItem('saved');
    console.log(saved);
    if (saved == 'true') getLocalData();
    else $('*:not(.toolbar *, .material-icons, .fab, .fas)').css('font-family', 'Montserrat');
};

$('#cv, #sidebar, .toolbar-font-size, .theme-color, #custom-color, #font').on('change keyup paste click', function() {
    saveData();
});

$('div[contenteditable]').keydown(function(e) {
    // trap the return key being pressed
    if (e.keyCode === 13) {
        return false;
    }
});

// New page
$('#cv').on('change click keyup', function() {
    let left = $('#cv .left-container').css('height');
    let right = $('#cv .right-container').css('height');
    if (right > '1120px') console.log('over');
    let html = '<div>'
})
