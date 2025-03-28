<!-- components/handleFile.vue -->
<script>
export default {
  methods: {
    handleFile(file) {
      if (!file) {
        this.$swal.fire({ icon: "error", text: "File not available." });
        return;
      }

      const extension = file.split('.').pop().toLowerCase();
      const downloadFormats = ['csv', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'zip', 'rar'];
      
      if (downloadFormats.includes(extension)) {
        // Auto-download logic
        const link = document.createElement('a');
        link.href = file;
        link.download = file.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.$swal.fire({
          icon: "success",
          title: "Download Started",
          text: `Your ${extension.toUpperCase()} file is downloading`,
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // For viewable formats (images/PDFs)
        window.open(file, '_blank');
      }
    }
  }
}
</script>