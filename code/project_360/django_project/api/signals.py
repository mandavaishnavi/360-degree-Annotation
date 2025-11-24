from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SavedData
from PIL import Image
from segmentation.models import SegAnnotations
import os
from users.models import User
from PIL import Image, ImageDraw
from django.http import JsonResponse



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


def crop_image_fx(input_path):
    # try:
        w,h=get_image_dimensions(input_path)
        last = input_path.split('/')[-1]
        frames = w//FRAME_LEN

        frames*=2


        # output_directory = f'./CROP/{last}'
        # os.makedirs(output_directory, exist_ok=True)
        # Open the image
        last = last.split('.')[0]
        output_directory_base = f'./media/CROP/{last}'
        os.makedirs(output_directory_base, exist_ok=True)

        image = Image.open(input_path)

        for i in range(frames):
            if w<i*FRAME_LEN/2+FRAME_LEN:
                cropped_image = image.crop((i*FRAME_LEN/2+1-(i*FRAME_LEN/2+FRAME_LEN-w),1,min(w,i*FRAME_LEN/2+FRAME_LEN),h))
            else:
                cropped_image = image.crop((i*FRAME_LEN/2+1,1,min(w,i*FRAME_LEN/2+FRAME_LEN),h))
            output_path = f'./media/CROP/{last}/{i+1}.jpg'
            cropped_image.save(output_path)
        return frames

def black_image(path, coordinates, path2, id):
    print("HERE")
    print(path)
    image = Image.open(path)
    print(coordinates)
    print(image.size)
    extracted_image = Image.new('RGB', image.size, color='black')
    mask = Image.new('L', image.size, color=0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.polygon(coordinates, fill=255)
    extracted_image = Image.composite(image, extracted_image, mask)



    output_directory_base = './media/Seg/' + path2
    print(output_directory_base)
    os.makedirs(output_directory_base, exist_ok=True)
    

    cropped_image_path = os.path.join(output_directory_base, str(id) + '.jpg')
    print(cropped_image_path)
    extracted_image.save(cropped_image_path)
    # cropped_image.save(cropped_image_path)
    
    # # Return the path to the cropped image
    # return JsonResponse({'cropped_image_path': cropped_image_path})


# Open the original image
# coordinates = [(100, 100), (200, 100), (200, 200), (300, 200), (300, 300), (100, 100)]  # Closed path

# # Create a new image with the same size as the original image
# extracted_image = Image.new('RGB', original_image.size, color='black')

# # Create a mask image based on the path
# mask = Image.new('L', original_image.size, color=0)
# mask_draw = ImageDraw.Draw(mask)
# mask_draw.polygon(coordinates, fill=255)

# # Apply the mask to the original image
# extracted_image = Image.composite(original_image, extracted_image, mask)

# # Save the extracted image
# extracted_image.save('extracted_image.png')




@receiver(post_save, sender=SavedData)
def crop_image(sender, instance, created, **kwargs):
    print("THERE")
    if created:  

        # crops image
        framecnt = crop_image_fx(instance.image.path)
        #save no of cropped images to database
        instance.no_of_frames = framecnt
        instance.save()

@receiver(post_save, sender=SegAnnotations)
def make_image(sender, instance, created, **kwargs):
    # print("THERE")
    if created:

        saved_data = instance.image
        id = instance.id
        frame = instance.frame_no
        coordinates = instance.coordinates
        converted_coordinates = []
        path = str(saved_data.image)
        path2 = (path.split(".")[0]).split('/')[-1]
        path1 = "./media/images/"+path2+".jpg"
        image=Image.open(path1)
        print(image.size)
        width,height=image.size
        constant=height/800
    # Iterate over the input list of dictionaries
        for point in coordinates:
            x = point['x']
            y = point['y']
            if height>=800:
                x=x*constant+(frame-1)*500
                y=y*constant
            else:
                x=x+(frame-1)*500
 
            # Append the tuple (x, y) to the converted_coordinates list
            converted_coordinates.append((x, y))
        converted_coordinates.append(converted_coordinates[0])
        # saved_data = SavedData.objects.get(id=img)
        path = str(saved_data.image)
        path2 = (path.split(".")[0]).split('/')[-1]
        path1 = "./media/images/"+path2+".jpg"
        # print(instance.id)
        black_image(path1,converted_coordinates,path2,id)
        # print(path2)
        # print(converted_coordinates)
        # print(frame)




