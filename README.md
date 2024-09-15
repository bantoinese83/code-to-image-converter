# Code to Image Converter

A web application that converts code snippets into styled images with various customization options.

## Features

- Real-time code preview
- Syntax highlighting for multiple languages
- Customizable styles, fonts, and layouts
- Options to share, add to favorites, and report bugs

## Technologies Used

- Python (Flask)
- JavaScript
- HTML/CSS
- Pygments for syntax highlighting

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bantoinese83/code-to-image-converter.git
    cd code-to-image-converter
    ```

2. Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the Flask application:
    ```sh
    python app.py
    ```

5. Open your browser and navigate to `http://127.0.0.1:5000`.

## Usage

1. Enter your code snippet in the provided textarea.
2. Select the desired language, style, font, and other options.
3. Click the "Convert" button to generate the image.
4. Use the "Share", "Add to Favs", and "Report Bug" buttons for additional actions.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.