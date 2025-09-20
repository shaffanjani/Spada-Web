const form = document.getElementById('formMahasiswa');

if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Cegah reload halaman

    // Ambil data dari form
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const genderEl = document.querySelector('input[name="gender"]:checked');

    if (!nim || !nama || !genderEl) {
      alert("Harap isi semua field!");
      return;
    }

    const gender = genderEl.value;

    // Ambil data lama dari Local Storage
    let mahasiswa = JSON.parse(localStorage.getItem('mahasiswa')) || [];

    // Tambahkan data baru
    mahasiswa.push({ nim, nama, gender });

    // Simpan kembali ke Local Storage
    localStorage.setItem('mahasiswa', JSON.stringify(mahasiswa));

    // Redirect ke halaman home
    window.location.href = "index.html";
  });
}

const tableBody = document.getElementById('mahasiswaTable');

if (tableBody) {
  let mahasiswa = JSON.parse(localStorage.getItem('mahasiswa')) || [];

  tableBody.innerHTML = ''; // Bersihkan tabel

  if (mahasiswa.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center">Belum ada data</td></tr>`;
  } else {
    mahasiswa.forEach((mhs, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${mhs.nim}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.gender}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="hapusData(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
}

function hapusData(index) {
  let mahasiswa = JSON.parse(localStorage.getItem('mahasiswa')) || [];
  mahasiswa.splice(index, 1);
  localStorage.setItem('mahasiswa', JSON.stringify(mahasiswa));
  location.reload();
}

const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('#mahasiswaTable tr');

    rows.forEach(row => {
      let text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? '' : 'none';
    });
  });
}
