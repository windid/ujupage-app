import moment, { parse } from 'src/utils/date'

describe('Date utils', () => {
  describe('#parse()', () => {
    it('should return a Date instance when input is valid', () => {
      expect(parse('2017-01-23')).to.be.instanceof(Date)
      const d = parse('2017-1-20 12:34')
      expect(d.getFullYear()).to.equal(2017)
      expect(d.getMonth()).to.equal(0)
      expect(d.getDate()).to.equal(20)
      expect(d.getHours()).to.equal(12)
      expect(d.getMinutes()).to.equal(34)
    })

    it('should throw an error when input is invalid', () => {
      try {
        parse('whatever')
        expect(false).to.be.true
      } catch (err) {
        expect(err).to.be.instanceof(TypeError)
      }
    })
  })

  describe('#moment()', () => {
    it('should return a moment instance that has a property `date`', () => {
      const m = moment('2017-01-23 12:34')
      expect(m).to.be.instanceof(moment)
      expect(m).to.include.keys('date')
      expect(m.date).to.be.instanceof(Date)
    })

    it('should return a `moment` represented current time when called without arguments', () => {
      const now = new Date()
      expect(moment().value().getTime() - now.getTime()).to.be.below(1000)
    })

    it('should return a new instance when pass a moment instance', () => {
      const m = moment('2017-01-23 12:34')
      expect(moment(m)).to.not.equal(m)
      expect(moment(m).value().getTime()).to.equal(m.value().getTime())
    })
  })

  describe('#format()', () => {
    it('should return a formatted string', () => {
      const m = moment('2017-1-8 12:34')
      expect(m.format('YYYY-M-D')).to.be.a('string')
      expect(m.format('YYYY-MM-DD')).to.equal('2017-01-08')
      expect(m.format('DD/MM')).to.equal('08/01')
    })
  })

  describe('#isBefore()', () => {
    it('should return true if `moment` is before the input date', () => {
      const d = new Date('2016/12/30 02:00')
      expect(moment('2016-12-20').isBefore(d)).to.be.true
      expect(moment('2016-12-30 01:00').isBefore(d)).to.be.true
    })

    it('should return false if `moment` is not before the input date', () => {
      const d = new Date('2016/12/30 02:00')
      expect(moment('2017-1-1').isBefore(d)).to.be.false
      expect(moment('2016-12-30 13:57').isBefore(d)).to.be.false
      expect(moment('2016-12-30 02:00').isBefore(d)).to.be.false
    })
  })

  describe('#After()', () => {
    it('should return true if `moment` is after the input date', () => {
      const d = new Date('2016/12/30 02:00')
      expect(moment('2017-1-1').isAfter(d)).to.be.true
      expect(moment('2016-12-30 13:57').isAfter(d)).to.be.true
    })

    it('should return false if `moment` is not after the input date', () => {
      const d = new Date('2016/12/30 02:00')
      expect(moment('2016-12-20').isAfter(d)).to.be.false
      expect(moment('2016-12-30 01:00').isAfter(d)).to.be.false
      expect(moment('2016-12-30 02:00').isAfter(d)).to.be.false
    })
  })

  describe('#manipulate functions', () => {
    describe('#add()', () => {
      it('should add months correctly', () => {
        expect(moment('2017-1-8 12:34').addMonths(2).format('YYYY-MM-DD')).to.equal('2017-03-08')
        expect(moment('2017-1-8 12:34').add(15, 'months').format('YYYY-MM-DD')).to.equal('2018-04-08')
      })

      it('should add days correctly', () => {
        expect(moment('2017-1-8 12:34').addDays(7).format('YYYY-MM-DD')).to.equal('2017-01-15')
        expect(moment('2017-1-8 12:34').add(30, 'days').format('YYYY-MM-DD')).to.equal('2017-02-07')
      })

      it('should add hours correctly', () => {
        expect(moment('2017-1-8 12:34').addHours(7).format('M-D HH:mm')).to.equal('1-8 19:34')
        expect(moment('2017-1-8 12:34').add(30, 'hours').format('M-D HH:mm')).to.equal('1-9 18:34')
      })
    })

    describe('#subtract()', () => {
      it('should subtract months correctly', () => {
        expect(moment('2017-1-8 12:34').subtract(2, 'months').format('YYYY-MM-DD')).to.equal('2016-11-08')
        expect(moment('2017-1-8 12:34').subtract(15, 'months').format('YYYY-MM-DD')).to.equal('2015-10-08')
      })

      it('should subtract days correctly', () => {
        expect(moment('2017-1-8 12:34').subtract(7, 'days').format('YYYY-MM-DD')).to.equal('2017-01-01')
        expect(moment('2017-1-8 12:34').subtract(30, 'days').format('YYYY-MM-DD')).to.equal('2016-12-09')
      })

      it('should subtract hours correctly', () => {
        expect(moment('2017-1-8 12:34').subtract(7, 'hours').format('M-D HH:mm')).to.equal('1-8 05:34')
        expect(moment('2017-1-8 12:34').subtract(30, 'hours').format('M-D HH:mm')).to.equal('1-7 06:34')
      })
    })
  })
})
