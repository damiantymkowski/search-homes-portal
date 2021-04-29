import React, { ChangeEvent, useEffect, useState } from "react";
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

const AddImage = (props: { handler: Function }) => {
  const functionsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageHandleChange(e);
    props.handler(e);
  };

  const getItems = (count: any, changeFunction: Function, setRef: Function) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: (
        <>
          <Styled.UploadBox
            htmlFor={"photos".concat(k.toString())}
            ref={setRef("photos".concat(k.toString()))}
          >
            <Camera />
          </Styled.UploadBox>
          <Styled.UploadPhoto
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              functionsOnChange(e)
            }
            type="file"
            id={"photos".concat(k.toString())}
          />
        </>
      ),
    }));

  const [items, setItems] = useState(Array());
  const [getRef, setRef] = useDynamicRefs();

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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
};

export default AddImage;
