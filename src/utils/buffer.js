'use strict'
const buffer = require('buffer');

const Buffer = buffer.Buffer;

class BufferWriter {
    constructor() {
        this.length = 0;
        this.buffers = [];
    }
    toBuffer() {
        return this.concat();
    }

    concat() {
        return Buffer.concat(this.buffers, this.length);
    };

    write(buf) {
        if (isBuffer(buf)) {
            this.buffers.push(buf);
            this.length += buf.length;
        }
        return this;
    };
    writeString(str){
        this.write(new Buffer(str));
        return this;
    }
    writeReverse(buf) {
        if (isBuffer(buf)) {
            this.buffers.push(reverse(buf));
            this.length += buf.length;
        }
        return this;
    };

    writeUInt8(n) {
        var buf = Buffer.alloc(1);
        buf.writeUInt8(n, 0);
        this.write(buf);
        return this;
    };

    writeUInt16BE(n) {
        var buf = Buffer.alloc(2);
        buf.writeUInt16BE(n, 0);
        this.write(buf);
        return this;
    };

    writeUInt16LE(n) {
        var buf = Buffer.alloc(2);
        buf.writeUInt16LE(n, 0);
        this.write(buf);
        return this;
    };

    writeUInt32BE(n) {
        var buf = Buffer.alloc(4);
        buf.writeUInt32BE(n, 0);
        this.write(buf);
        return this;
    };

    writeInt32LE(n) {
        var buf = Buffer.alloc(4);
        buf.writeInt32LE(n, 0);
        this.write(buf);
        return this;
    };

    writeUInt32LE(n) {
        var buf = Buffer.alloc(4);
        buf.writeUInt32LE(n, 0);
        this.write(buf);
        return this;
    };


    writeVarintNum(n) {
        var buf = BufferWriter.varintBufNum(n);
        this.write(buf);
        return this;
    };


    static varintBufNum(n) {
        var buf = undefined;
        if (n < 253) {
            buf = Buffer.alloc(1);
            buf.writeUInt8(n, 0);
        } else if (n < 0x10000) {
            buf = Buffer.alloc(1 + 2);
            buf.writeUInt8(253, 0);
            buf.writeUInt16LE(n, 1);
        } else if (n < 0x100000000) {
            buf = Buffer.alloc(1 + 4);
            buf.writeUInt8(254, 0);
            buf.writeUInt32LE(n, 1);
        } else {
            buf = Buffer.alloc(1 + 8);
            buf.writeUInt8(255, 0);
            buf.writeInt32LE(n & -1, 1);
            buf.writeUInt32LE(Math.floor(n / 0x100000000), 5);
        }
        return buf;
    };
}

class BufferReader {
    constructor(buf) {
        this.pos = 0;
        if (typeof buf === 'string') {
            this.buffer = Buffer.from(buf, 'hex');
        } else {
            this.buffer = buf;
        }

    }
    finished() {
        return this.pos >= this.buffer.length;
    };


    read(length) {
        var buf = this.buffer.slice(this.pos, this.pos + length);
        this.pos = this.pos + length;
        return buf;
    };

    readAll() {
        var buf = this.buf.slice(this.pos, this.buffer.length);
        this.pos = this.buffer.length;
        return buf;
    };

    readUInt8() {
        let v = this.buffer.readUInt8(this.pos);
        this.pos = this.pos + 1;
        return v;
    };

    readUInt16BE() {
        let v = this.buffer.readUInt16BE(this.pos);
        this.pos = this.pos + 2;
        return v;
    };

    readUInt16LE() {
        let v = this.buffer.readUInt16LE(this.pos);
        this.pos = this.pos + 2;
        return v;
    };

    readUInt32BE() {
        let v = this.buffer.readUInt32BE(this.pos);
        this.pos = this.pos + 4;
        return v;
    };

    readUInt32LE() {
        let v = this.buffer.readUInt32LE(this.pos);
        this.pos = this.pos + 4;
        return v;
    };

    readInt32LE() {
        let v = this.buffer.readInt32LE(this.pos);
        this.pos = this.pos + 4;
        return v;
    };


    readVarintNum() {
        var first = this.readUInt8();
        switch (first) {
            case 0xFD:
                return this.readUInt16LE();
            case 0xFE:
                return this.readUInt32LE();
            default:
                return first;
        }
    };

    /**
     * reads a length prepended buffer
     */
    readVarLengthBuffer() {
        var len = this.readVarintNum();
        var buf = this.read(len);
        $.checkState(buf.length === len, 'Invalid length while reading varlength buffer. ' +
            'Expected to read: ' + len + ' and read ' + buf.length);
        return buf;
    };

    readVarintBuf() {
        var first = this.buf.readUInt8(this.pos);
        switch (first) {
            case 0xFD:
                return this.read(1 + 2);
            case 0xFE:
                return this.read(1 + 4);
            case 0xFF:
                return this.read(1 + 8);
            default:
                return this.read(1);
        }
    };
    reverse() {
        var buf = Buffer.alloc(this.buf.length);
        for (var i = 0; i < buf.length; i++) {
            buf[i] = this.buf[this.buf.length - 1 - i];
        }
        this.buf = buf;
        return this;
    };

    readReverse(len) {
        if (_.isUndefined(len)) {
            len = this.buf.length;
        }
        var buf = this.buf.slice(this.pos, this.pos + len);
        this.pos = this.pos + len;
        return BufferUtil.reverse(buf);
    };
}

function createWriter() {
    return new BufferWriter();
}

function createReader() {
    return new BufferReader();
}
function isBuffer(buf) {
    return buffer.Buffer.isBuffer(buf) || buf instanceof Uint8Array;
}

function reverse(param) {
    var ret = new buffer.Buffer(param.length);
    for (var i = 0; i < param.length; i++) {
        ret[i] = param[param.length - i - 1];
    }
    return ret;
}

function from(){
    return Buffer.from();
}
module.exports = {
    isBuffer,
    createWriter,
    createReader,
    from
}