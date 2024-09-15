import logging

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
from pygments.util import ClassNotFound

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    try:
        data = request.get_json()
        if not data:
            logger.error("No JSON data received")
            return jsonify({'error': 'No data received'}), 400

        code = data.get('code')
        language = data.get('language')
        style = data.get('style')
        font_family = data.get('font_family')
        font_size = data.get('font_size')
        tab_size = data.get('tab_size')
        shadow = data.get('shadow')
        image_quality = data.get('image_quality')
        padding = data.get('padding')
        line_numbers = data.get('line_numbers')
        watermark = data.get('watermark')
        layout = data.get('layout')

        if not code or not language:
            logger.error("Code and language are required")
            return jsonify({'error': 'Code and language are required'}), 400

        # Get lexer for the specified language
        try:
            lexer = get_lexer_by_name(language)
        except ClassNotFound:
            logger.error(f"Invalid language: {language}")
            return jsonify({'error': f'Invalid language: {language}'}), 400

        # Create an HTML formatter with the selected style
        formatter = HtmlFormatter(
            style=style,
            linenos=line_numbers == 'true',
            font_family=font_family,
            font_size=font_size,
            tab_size=tab_size,
            shadow=shadow,
            image_quality=image_quality,
            padding=padding
        )

        # Highlight the code and convert it to HTML
        highlighted_code = highlight(code, lexer, formatter)

        # Add watermark and layout to the highlighted code
        if watermark:
            highlighted_code += f'<div class="watermark">{watermark}</div>'
        if layout:
            highlighted_code = f'<div class="{layout}">{highlighted_code}</div>'

        return jsonify({'highlighted_code': highlighted_code}), 200

    except Exception as e:
        logger.exception("An error occurred during conversion")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)