from typing import TypeVar, Generic, Optional

T = TypeVar("T", int, float, str)


class Node(Generic[T]):
    def __init__(self, item: Optional[T]):
        self.__item: Optional[T] = item
        self.__pointer: Optional["Node"] = None

    # * item getter
    @property
    def item(self) -> Optional[T]:
        return self.__item

    @property
    def pointer(self) -> Optional["Node"]:
        return self.__pointer

    @pointer.setter
    def pointer(self, newNode):
        self.__pointer = newNode


class LinkedList(Generic[T]):
    def __init__(self, item: Optional[T] = None):
        self.__length: int = 0
        self.__head: Optional[Node[T]] = None if item is None else Node[T](item)

    # * length getter & setter
    @property
    def length(self) -> int:
        return self.__length

    @length.setter
    def length(self, newLen: int):
        if abs(newLen - self.__length) == 1:
            self.__length = newLen
        else:
            raise ValueError("Bad Request for length")

    # * head getter & setter
    @property
    def head(self) -> Optional[Node[T]]:
        return self.__head

    @head.setter
    def head(self, newHead: Optional[Node[T]]):
        self.__head = newHead


class Stack(Generic[T], LinkedList[T]):
    """
    properties:
    __length
    __head
    top
    """

    def __init__(self, item: Optional[T] = None):
        super().__init__(item)
        self.top: Optional[Node[T]] = None if self.head is None else Node[T](item)

    def __str__(self) -> str:
        temp: Optional[Node[T]] = self.head
        ret: str = ""
        idx: int = 0

        if temp == None:
            return f"[empty] item: None, next: {temp}"

        # making return string
        while temp.pointer != None:
            ret += f"[{idx}] item: {temp.item}, next: {temp.pointer}\n"
            temp = temp.pointer
            idx += 1
        ret += f"[{idx}] item: {temp.item}, next: {temp.pointer}"

        return ret

    def push(self, item: T):
        tempNode: Node[T] = Node[T](item)

        if self.top is None:
            self.head = tempNode
        else:
            self.top.pointer = tempNode

        self.top = tempNode
        self.length += 1

    def pop(self) -> Optional[T]:
        if self.top is None:
            return None

        temp: Optional[Node[T]] = self.head
        wasTopItem: Optional[T] = self.top.item

        if temp.pointer == None:
            self.head = None
            self.top = None
            self.length -= 1
            return wasTopItem

        while temp.pointer != self.top:
            temp = temp.pointer

        temp.pointer = None
        self.top = temp
        self.length -= 1

        return wasTopItem


emptyStack = Stack[int]()

print(emptyStack)
print(f"length: {emptyStack.length}\n")

emptyStack.push(1)
emptyStack.push(2)
emptyStack.push(3)
print(emptyStack)
print(f"length: {emptyStack.length}\n")

print(f"topItem: {emptyStack.pop()}")
print(f"topItem: {emptyStack.pop()}")
print(f"topItem: {emptyStack.pop()}")

print(emptyStack)
print(f"length: {emptyStack.length}\n")
