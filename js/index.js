 function openModal(){ document.getElementById("resultsModal").style.display = "flex"; }
    function closeModal(){ document.getElementById("resultsModal").style.display = "none"; }

    function updateMap(location){
        const iframe = document.getElementById("map-iframe");
        iframe.src = "https://www.google.com/maps?q=" + (location ? encodeURIComponent(location) : "Thailand") + "&output=embed";
    }

    function searchJobs(){
        const jobType = document.getElementById("job-type").value;
        const locationInput = document.getElementById("location").value.trim();

        document.getElementById("modalJobTypeHeader").innerText = jobType || "ทุกประเภทงาน";
        document.getElementById("modalLocationHeader").innerText = locationInput || "ทุกพื้นที่";

        updateMap(locationInput);
        openModal();

        document.getElementById("modalResultsBody").innerHTML = `
            <div class="job-card">
                <h3>นายวิชัย พืชผล (ทีมงานดำนา)</h3>
                <p><strong>ประเภท:</strong> ดำนา | <strong>พื้นที่:</strong> เลย</p>
                <p>ประสบการณ์กว่า 10 ปี ทำงานละเอียด เชื่อถือได้</p>
                <button>ติดต่อ</button>
            </div>

            <div class="job-card">
                <h3>บริษัท สยามเกี่ยวข้าว จำกัด</h3>
                <p><strong>ประเภท:</strong> รถเกี่ยว | <strong>พื้นที่:</strong> ขอนแก่น</p>
                <p>รถเกี่ยวระบบ GPS รุ่นใหม่ ทำงานรวดเร็ว</p>
                <button>ติดต่อ</button>
            </div>
        `;
    }

    document.addEventListener("DOMContentLoaded", () => updateMap(""));