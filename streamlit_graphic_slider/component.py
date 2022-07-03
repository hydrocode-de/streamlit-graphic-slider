from typing import List
import os
import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_graphic_slider",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_graphic_slider", path=build_dir)


def graphic_slider(default: List[int] = [25, 50], images: List[str] = None, update_on: str = 'end'):
    """
    """
    # check input args
    if update_on.lower() not in ('end', 'change'):
        raise ValueError("update_on has to be one of 'end', 'change'.")

    # build the arguments
    args = dict(
        default=default,
        updateOn=update_on
    )

    if images is not None:
        args['bgImg'] = images


    # get the values from the frontend
    values = _component_func(**args)
    
    return values
