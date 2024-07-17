// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_cutsheet_times])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_cutsheet_times(base64: String) -> String {
    let result = files::pdf::handle_pdf(base64);

    match result {
        Ok(result) => result,
        Err(e) => e,
    }
}
