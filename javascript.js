function exportToExcel() {
    let tableData = [];
    let inputs = document.querySelectorAll("input, textarea");
    let headers = [];
    inputs.forEach(input => headers.push(input.placeholder || input.id));
    tableData.push(headers);

    let rowData = [];
    inputs.forEach(input => rowData.push(input.value));
    tableData.push(rowData);

    let ws = XLSX.utils.aoa_to_sheet(tableData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cadastro");

    XLSX.writeFile(wb, "Cadastro.xlsx");
}

function exportToWord() {
    let doc = document.createElement("a");
    let content = "<h2>Cadastro de Cliente</h2>";
    
    document.querySelectorAll("input, textarea").forEach(input => {
        content += `<p><strong>${input.placeholder || input.id}:</strong> ${input.value}</p>`;
    });

    let blob = new Blob(['\ufeff', content], {
        type: "application/msword"
    });

    let url = URL.createObjectURL(blob);
    doc.href = url;
    doc.download = "Cadastro.doc";
    doc.click();
    URL.revokeObjectURL(url);
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Título do PDF
    doc.setFontSize(18);
    doc.text("Cadastro de Cliente", 10, 10);

    // Linha de separação
    doc.setLineWidth(0.5);
    doc.line(10, 13, 200, 13); 

    let y = 20;  // Posição inicial para o primeiro item

    // Cabeçalhos de seção
    doc.setFontSize(12);
    doc.text("Informações do Cadastro", 10, y);
    y += 10;

    // Iterando sobre todos os campos do formulário
    document.querySelectorAll("input, textarea").forEach(input => {
        let label = input.placeholder || input.id;
        let value = input.value || "Não preenchido";
        
        // Adicionando o campo no PDF
        doc.setFontSize(10);
        doc.text(`${label}: ${value}`, 10, y);
        y += 8;  // Espaço entre cada linha
    });

    // Linha final de separação
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y); 

    // Salvar o arquivo PDF
    doc.save("Cadastro.pdf");
}
