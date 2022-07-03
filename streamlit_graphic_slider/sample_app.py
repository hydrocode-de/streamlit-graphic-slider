import streamlit as st

def app():
    from streamlit_graphic_slider.component import graphic_slider

    values = graphic_slider(update_on='end')

    st.markdown('## Output')
    st.json(values)


if __name__ == '__main__':
    app()
