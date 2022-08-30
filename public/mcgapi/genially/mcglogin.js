(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
js = d.createElement("script"); 
js.id = id; 
js.async = true; 
js.src = "https://www.myclassgame.es/mcgapi/genially/sweetalert2.min.js"; 
ref.parentNode.insertBefore(js, ref); }
(document));
function showStudentData(studentCreds) {
    const student=studentCreds;    
    let id=student.studentCode;
    let url='https://www.myclassgame.es/studentData/'+id;
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if ( data.alias == studentCreds.alias) {
            localStorage.setItem('mcgStudentCreds', JSON.stringify(studentCreds));
            localStorage.setItem('mcgStudentData', JSON.stringify(data));
            Swal.fire({
                title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
                background: '#268bd2',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Logout',
                cancelButtonColor: '#0f0',
                imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
                imageWidth: 75,
                imageHeight: 75,
                imageAlt: '@MyClassGame',
                html:
                    '<div class="mcgStudentData">' +
                    '<h2>' + data.studentName + '</h2>' +
                    '<h4> ('+ data.alias + ') </h4>' +
                    '<h4 class="mcgData">' + data.XP + ' XP</h4>' +
                    '<h4 class="mcgData">' + data.HP + ' HP</h4>' +
                    '<h4 class="mcgData">' + data.coins + ' Monedas</h4>' +
                    '<h4 class="mcgData">Nivel: ' + data.level + '</h4>' +
                    '</div>',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem('mcgStudentCreds', '');
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                html:
                    '<div class="mcgStudentData">' +
                    '<h2>Alias o Código incorrectos</h2>' +
                    '</div>',
                background: '#268bd2',
                confirmButtonColor: '#d33',
            })
            localStorage.setItem('mcgStudentCreds', '');
        }
    })
    .catch((err) => console.log(err));
}
async function SA() {
    if ( ! localStorage.getItem('mcgStudentCreds')) {
        const { value: formValues } = await Swal.fire({
            title: '<span style="color:yellow;">@</span><span style="color:red;">My</span><span style="color:blue;">Class</span><span style="color:lime;">Game</span>',
            background: '#268bd2',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#0f0',
            confirmButtonText: 'Login',
            cancelButtonColor: '#d33',
            imageUrl: 'https://www.myclassgame.es/images/@mcgnb.png',
            imageWidth: 75,
            imageHeight: 75,
            imageAlt: '@MyClassGame',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Alias">' +
                '<input id="swal-input2" class="swal2-input" placeholder="StudentCode">',
            focusConfirm: false,
            preConfirm: () => {
                const student = {
                    alias: document.getElementById('swal-input1').value,
                    studentCode: document.getElementById('swal-input2').value
                }
                return student
            }
        })
        if (formValues) {
            showStudentData(formValues)
        }
    } else {
        showStudentData(JSON.parse(localStorage.getItem('mcgStudentCreds')))
    }
}
const element = document.getElementById("myclassgame");
element.addEventListener("click", SA);