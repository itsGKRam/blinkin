import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
        padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
        paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: 30,
        fontWeight: 700,
        width: 60,
    },

    dragHandle: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[1]
                : theme.colors.gray[6],
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },
}));

export default function DndListHandle({ data }) {
    const { classes, cx } = useStyles();
    const [state, handlers] = useListState(data);

    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
            {(provided, snapshot) => (
                <div
                    className={cx(classes.item, {
                        [classes.itemDragging]: snapshot.isDragging,
                    })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}
                    >
                        <div className=' blinkIn-w-3 blinkIn-h-3 blinkIn-rounded-full' />
                    </div>
                    <Text className={classes.symbol}>{item.symbol}</Text>
                    <div>
                        <Text>{item.name}</Text>
                        <Text color='dimmed' size='sm'>
                            Position: {item.position} • Mass: {item.mass}
                        </Text>
                    </div>
                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) =>
                handlers.reorder({ from: source.index, to: destination.index })
            }
        >
            <Droppable droppableId='dnd-list' direction='vertical'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}