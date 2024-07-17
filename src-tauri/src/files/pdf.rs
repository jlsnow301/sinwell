use base64::{engine::general_purpose, Engine as _};

pub fn handle_pdf(pdf_data: String) -> Result<String, String> {
    let decoded = general_purpose::STANDARD
        .decode(pdf_data)
        .map_err(|e| e.to_string())?;

    Ok("PDF received and processed".into())
}
