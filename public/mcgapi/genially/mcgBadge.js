(function (d) { 
var js, id = "genially-embed-js", ref = d.getElementsByTagName("script")[0];
if (d.getElementById(id)) { return; }
js = d.createElement("script"); 
js.id = id; 
js.async = true; 
js.src = "https://www.myclassgame.es/mcgapi/genially/sweetalert2.min.js"; 
ref.parentNode.insertBefore(js, ref); }
(document));

let stock;

function loadImage() {
    alert("A")
    const logo = document.getElementById("mcgLogo");
    logo.style.opacity=0
    const badgeDiv = document.getElementById("badgeDiv");
    badgeDiv.style.opacity=1
    let id="pgWwZYvhnSiBqXNJi"
    let studentId='2GkimY';
    let url='http://localhost:8000/mcgBadge/'+id+'?sId='+studentId;
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        const element = document.getElementById("imgBadge");
        element.src=data.image_url;
        stock=data.stock;
        if ( data.stock ) {
            const check = document.getElementById("greenCheck");
            check.style.opacity=1
        }
    })
    .catch((err) => console.log(err));
}

function winBadge() {
    if ( ! stock ) {
        let badgeId="pgWwZYvhnSiBqXNJi"
        //let studentCreds=JSON.parse(localStorage.getItem('mcgStudentCreds'));
        let studentId='2GkimY';
        let url='http://localhost:8000/winBadge/';
        data= {
            'elementType': 'badge',
            'elementId' : badgeId,
            'studentId' : studentId
        }
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
            body: JSON.stringify(data)
        })
        .then((response) => {
            response.json()
            console.log(response)
            const check = document.getElementById("greenCheck");
            check.style.opacity=1
            stock=true
            Swal.fire({
                icon: 'info',
                html:
                    '<div class="mcgStudentData">' +
                    '<h2>¡Insignia conseguida!</h2>' +
                    '</div>',
                background: '#268bd2',
                confirmButtonColor: '#d33',
            })
        })
        .catch((err) => console.log(err));
    } else {
        Swal.fire({
            icon: 'warning',
            html:
                '<div class="mcgStudentData">' +
                '<h2>Insignia ya conseguida</h2>' +
                '</div>',
            background: '#268bd2',
            confirmButtonColor: '#d33',
        })
    }
}

const badge = document.getElementById("imgBadge");
badge.addEventListener("click", winBadge);
const logo = document.getElementById("mcgLogo");
logo.addEventListener("click", loadImage);
