import sys
import io
import requests
from matplotlib import pyplot
from mtcnn.mtcnn import MTCNN
import numpy as np

url = sys.argv[0]
response = requests.get(url).content
pixels = pyplot.imread(io.BytesIO(response), format='JPG')
detector = MTCNN()
faces = detector.detect_faces(pixels)

def draw_image_with_boxes(data, result_list):
    pyplot.imshow(data)
    
    ax = pyplot.gca()

    for result in result_list:
        x, y, width, height = result['box']
        rect = Rectangle((x, y), width, height, fill=False, color='red')
        ax.add_patch(rect)     
        print([x, y])
        
        keypoints = result['keypoints']
        mX, mY = keypoints['nose']
        leX, leY = keypoints['left_eye']
        reX, reY = keypoints['right_eye']
        moustacheSizeX, moustacheSizeY = 60, 36
        angle = np.degrees(np.arctan2(reY-leY, reX-leX))
        print(angle)
        moustache = Rectangle((float(mX-moustacheSizeX/2), float(mY-moustacheSizeY/2)+45), moustacheSizeX, moustacheSizeY, angle, fill=True, color='black')
        ax.add_patch(moustache)
    pyplot.show()



