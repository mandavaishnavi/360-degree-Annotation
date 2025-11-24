from PIL import Image
import requests
from io import BytesIO
import os


#constants
FRAME_LEN = 1000

def get_image_dimensions(url):
    # try:

        # Open the image using Pillow from the image content
        image = Image.open(url)
        # Get the dimensions (width, height) of the image
        width, height = image.size

        return width, height

    # except Exception as e:
    #     print(f"Error: {e}")
    #     return None
    

def crop_image(input_path):
    # try:
        w,h=get_image_dimensions(input_path)
        last = input_path.split('/')[-1]
        frames = w//FRAME_LEN
        frames*=2

        # output_directory = f'./CROP/{last}'
        # os.makedirs(output_directory, exist_ok=True)
        # Open the image
        output_directory_base = f'./media/CROP/{last}'
        os.makedirs(output_directory_base, exist_ok=True)

        image = Image.open(input_path)

        for i in range(frames):
            cropped_image = image.crop((i*FRAME_LEN/2+1,1,i*FRAME_LEN/2+FRAME_LEN,h))
            output_path = f'./media/CROP/{last}/{i+1}.jpg'
            cropped_image.save(output_path)






        # Crop the image

        # Save the cropped image

        print("Image cropped and saved successfully.")

    # except Exception as e:
    #     print(f"Error: {e}")


crop_image('./media/images/karan.jpg')
# print(get_image_dimensions('./media/images/karan.jpg'))
# current_directory = os.path.abspath(os.getcwd())
# print(current_directory)
