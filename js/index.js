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

    // === Gallery and image modal interactions ===
    document.addEventListener('DOMContentLoaded', () => {
        const gallery = document.querySelector('.img');
        const items = Array.from(document.querySelectorAll('.img .item'));
        const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
        const imageModal = document.getElementById('imageModal');
        const modalImg = document.getElementById('imageModalImg');
        const modalTitle = document.getElementById('imageModalTitle');
        const modalDesc = document.getElementById('imageModalDesc');
        const imageDownload = document.getElementById('imageDownload');
        const btnPrev = document.getElementById('imagePrev');
        const btnNext = document.getElementById('imageNext');
        const btnClose = document.getElementById('imageModalClose');
        let currentIndex = -1;

        function setImageModal(index) {
            if (index < 0 || index >= items.length) return;
            currentIndex = index;
            const item = items[currentIndex];
            const img = item.querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt || '';
            modalTitle.innerText = item.dataset.category || img.title || '';
            modalDesc.innerText = item.dataset.description || img.alt || '';
            imageDownload.href = img.src;
            imageDownload.setAttribute('download', img.src.split('/').pop().split('?')[0]);
        }

        function openImageModal(index) {
            setImageModal(index);
            imageModal.style.display = 'flex';
            imageModal.setAttribute('aria-hidden', 'false');
        }

        function closeImageModal() {
            imageModal.style.display = 'none';
            imageModal.setAttribute('aria-hidden', 'true');
            modalImg.classList.remove('zoomed');
        }

        function findNextVisible(start, dir = 1) {
            if (items.length === 0) return -1;
            let i = start;
            do {
                i = (i + dir + items.length) % items.length;
                if (items[i].style.display !== 'none') return i;
            } while (i !== start);
            return start;
        }

        function nextImage() { setImageModal(findNextVisible(currentIndex, 1)); }
        function prevImage() { setImageModal(findNextVisible(currentIndex, -1)); }

        // Gallery click handler (open modal on image or details click)
        gallery?.addEventListener('click', (e) => {
            const item = e.target.closest('.item');
            if (!item) return;
            const index = items.indexOf(item);
            if (e.target.classList.contains('view-btn') || e.target.tagName === 'IMG') {
                openImageModal(index);
            }
        });

        // Filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                items.forEach(item => {
                    item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
                });
            });
        });

        // Modal controls
        btnClose?.addEventListener('click', closeImageModal);
        btnNext?.addEventListener('click', nextImage);
        btnPrev?.addEventListener('click', prevImage);

        // Click outside modal content closes modal
        imageModal?.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (imageModal && imageModal.style.display === 'flex') {
                if (e.key === 'Escape') closeImageModal();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); nextImage(); }
            }
        });

        // Double click to toggle zoom
        modalImg?.addEventListener('dblclick', () => modalImg.classList.toggle('zoomed'));
    });