from PIL import Image, ImageDraw
from django.http import JsonResponse

def crop_image(request):
    # Receive coordinates from frontend
    coordinates = request.POST.get('coordinates')
    

    image_path = 'path/to/your/image.jpg'  # Replace with your image path
    image = Image.open(image_path)
    
    # Create a mask based on the received coordinates
    mask = Image.new('L', image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(coordinates, outline=1, fill=1)
    
    # Apply the mask to the image
    cropped_image = Image.composite(image, Image.new('RGB', image.size, (255, 255, 255)), mask)
    
    # Save the cropped image
    cropped_image_path = 'path/to/save/cropped/image.jpg'  # Replace with your desired save path
    cropped_image.save(cropped_image_path)
    
    # Return the path to the cropped image
    return JsonResponse({'cropped_image_path': cropped_image_path})
