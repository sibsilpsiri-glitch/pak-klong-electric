// ตัวอย่าง Logic การตรวจสอบวงจรแบบลึก (Deep Circuit Validation)
class CircuitNode {
    constructor(type) {
        this.type = type; // 'source', 'wire', 'resistor', 'gate', 'bulb'
        this.connections = []; // เก็บ Node ที่เชื่อมต่ออยู่
        this.isPowered = false;
        this.voltage = 0;
    }
}

function updatePhysics() {
    // ใช้ Breadth-First Search (BFS) เพื่อไล่สถานะไฟฟ้าจากแหล่งกำเนิด
    let queue = [powerSource];
    let visited = new Set();
    
    while(queue.length > 0) {
        let current = queue.shift();
        // คำนวณกฎของโอห์ม (V = IR) แบบจำลองในแต่ละ Node
        current.connections.forEach(neighbor => {
            if (isValidConnection(current, neighbor)) {
                neighbor.voltage = calculateDrop(current.voltage, neighbor);
                if (neighbor.voltage > 240) explode(neighbor); // ยากตรงที่ไฟเกินแล้วพัง
                queue.push(neighbor);
            }
        });
    }
}
