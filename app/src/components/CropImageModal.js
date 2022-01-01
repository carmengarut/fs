import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Form, Container, Button, Modal } from 'react-bootstrap'

const CropImageModal = ({ show, setShow, setProfileImg }) => {
  const [srcImg, setSrcImg] = useState(null)
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [result, setResult] = useState(null)

  const handleImage = async (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]))
  }

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement('canvas')
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      const base64Image = canvas.toDataURL('image/jpeg', 1)
      setResult(base64Image)
    } catch (e) {
      console.log('crop the image')
    }
  }

  const handleClick = async (event) => {
    event.preventDefault()
    setProfileImg(result)
    setShow(false)
  }

  return (
    <Container>
      <Modal show={show} onHide={() => setShow(false)}>

        <Modal.Body>
          <Modal.Title>Crop your photo</Modal.Title>
          Select the part of the photo to want to use.
          <br />
          <br />
          <Form>
            <Form.Group>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleImage}
              />
            </Form.Group>
          </Form>

          {srcImg && (
            <div>
              <ReactCrop
                style={{ maxWidth: '50%' }}
                src={srcImg}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />
              <Button
                className='cropButton' onClick={getCroppedImg}
              >
                crop
              </Button>
            </div>
          )}
          {result && (
            <div>
              <img src={result} alt='cropped image' />
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CropImageModal
