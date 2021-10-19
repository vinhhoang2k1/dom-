// var postApi = 'http://localhost:3000/posts';
// fetch(postApi)
//     .then((response) => {
//         return response.json();
//     })
//     .then((posts) => {
//         var htmls = posts.map((post) => {
//             return `<h2>${post.userId}</h2>`
//         });
//         // console.log(htmls);
//         var ID = document.querySelector('.box-text');
//         ID.innerHTML = htmls.join('');
//     })

// fetch(postApi)
//     .then((Response) => {
//         return Response.json();
//     })
//     .then((posts) => {

//         var htmls = posts.map((post) => {
//             return `<p>id :<span>${post.id}</span></p>
//             <p>id :<span>${post.title}</span></p>
//             <p>id :<span>${post.author}</span></p>`
//         });
//         // console.log(htmls)
//         var infomation = document.querySelector('.box-text');
//         infomation.innerHTML = htmls.join('');
//     })


// create courses

var coursesList = ' http://localhost:3000/courses';

function start() {
    // chuong trinh chay 
    getCourses((courses) => {
        renderCourses(courses);
    });
    handleCreateForm();

}

start();

// function 
function getCourses(callback) {
    // lay courses
    fetch(coursesList)
        .then((response) => {
            return response.json();
        })
        .then(callback)
}

function handleCreateCourses(data, callback) {
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(coursesList, option)
        .then((response) => {
            response.json();
        })
        .then(callback)

}

function handleDeleteCourses(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(coursesList + '/' + id, option)
        .then((response) => {
            response.json();
        })
        .then(() => {
            let courseItem = document.querySelector('.course-item' + id);
            // console.log(courseItem);
            if (courseItem) {
                courseItem.remove();
            }
        })
}


function renderCourses(courses) {
    // render html
    let courseItem = document.querySelector('.box-text');
    let htmls = courses.map((course) => {
        return `
            <li class="course-item-${course.id}" >
                <h1>${course.name}</h1>
                <p>${course.discription}</p>
                <button onclick="handleDeleteCourses(${course.id})">xóa</button>
            </li>
        `
    });

    courseItem.innerHTML = htmls.join('');


}
function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value;
        var discription = document.querySelector('input[name="discription"]').value;
        var formData = {
            name: name,
            discription: discription
        };

        handleCreateCourses(formData, () => {
            getCourses((courses) => {
                renderCourses(courses);
            });
        });
    }
}

