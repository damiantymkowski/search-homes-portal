import React, {
  ChangeEvent,
  ForwardedRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Styled from "./style.styles";
import { Camera } from "react-feather";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useDynamicRefs from "use-dynamic-refs";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const AddImage = React.forwardRef(
  (
    props: { handler: Function; setItems: Function },
    ref: ForwardedRef<any>
  ) => {
    const functionsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      imageHandleChange(e);
      props.handler(e);
    };

    const [items, setItems] = useState(Array());
    const [getRef, setRef] = useDynamicRefs();

    const getItems = (count: any, changeFunction: Function, setRef: Function) =>
      Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `photos-file${k}`,
        content: (
          <>
            <Styled.UploadBox
              htmlFor={"photos".concat(k.toString())}
              ref={setRef("photos".concat(k.toString()))}
              id={"photos-file".concat(k.toString())}
            >
              <Camera />
            </Styled.UploadBox>
            <Styled.UploadPhoto
              ref={setRef("photos-file".concat(k.toString()))}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                functionsOnChange(e)
              }
              type="file"
              id={"photos".concat(k.toString())}
              name={"photos-file".concat(k.toString())}
            />
          </>
        ),
      }));

    const imageHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      let base64Img = "";
      if (!e.target.files) return;

      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = function () {
        if (typeof reader.result === "string") {
          base64Img = btoa(reader.result);
        }
        const label = getRef(e.target.id) as any;
        label.current.style.background =
          "url(data:image/png;base64," + base64Img + ")";
        label.current.style.backgroundSize = "cover";
        return base64Img;
      };
    };

    useEffect(() => {
      setItems(getItems(6, imageHandleChange, setRef));
    }, []);

    const onDragEnd = (result: any) => {
      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );

      setItems(newItems);
      props.setItems(newItems);
    };

    return (
      <>
        <Styled.UploadContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <Styled.UploadContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <Styled.PhotosContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </Styled.PhotosContainer>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Styled.UploadContainer>
              )}
            </Droppable>
          </DragDropContext>
        </Styled.UploadContainer>
      </>
    );
  }
);

export default AddImage;
